(function ( localStorage ) {
	function bind ( ctx, fn ) {
		return function () {
			return fn.apply ( ctx, arguments );
		};
	};

	function ChromeStorage ( localStorage ) {
		var self = this;

		this.localStorage = localStorage;

		this.getItem = bind ( this, this.getItem );
		this.setItem = bind ( this, this.setItem );

		this._getKeyType = function ( key ) {
			if ( typeof key === 'string' ) {
				return 'string';
			} else if ( Object.prototype.toString.call ( key ) === '[object Array]' ) {
				return 'array';
			} else {
				return 'dictionary';
			}
		};

		this._getItemByString = function ( key ) {
			// TODO: check how chrome handles this (does it return a value or a object { key: value } ?)
			return self.localStorage.getItem ( key );
		};

		this._getItemByKeyList = function ( keyList ) {
			var results = {};
			for ( k in keyList ) {
				// TODO: check how chrome handles non existing keys
				results[keyList[k]] = self.localStorage.getItem ( keyList[k] );
			}

			return results;
		};

		this._getItemByDictionary = function ( keyDictionary ) {
			// get by dictionary
			var results = {};
			for ( k in keyDictionary ) {
				results[k] = self.localStorage.getItem ( k );
				if ( results[k] === null ) {
					// use (provided) default value, if key does not exist in storage
					results[k] = keyDictionary[k];
				}
			}

			return results;
		};
	};

	ChromeStorage.prototype.getItem = function ( key ) {
		var keyType = this._getKeyType ( key );

		if ( keyType === 'string' ) {
			return this._getItemByString ( key );
		} else if ( keyType === 'array' ) {
			return this._getItemByKeyList ( key );
		} else if ( keyType === 'dictionary' ) {
			return this._getItemByDictionary ( key );
		}

		throw new TypeError ( 'key is not a string, array or a dictionary' );
	};

	ChromeStorage.prototype.setItem = function ( key, value ) {
		//chrome.storage.sync.set ( { key: value } );

		return this.localStorage.setItem ( key, value );
	};

	window.chromeStorage = new ChromeStorage ( localStorage );

} ( window.localStorage ) );