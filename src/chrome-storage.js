(function ( localStorage ) {
	function bind ( ctx, fn ) {
		return function () {
			return fn.apply ( ctx, arguments );
		};
	};

	function ChromeStorage ( localStorage ) {
		this.localStorage = localStorage;

		this.getItem = bind ( this, this.getItem );
		this.setItem = bind ( this, this.setItem );
	};

	ChromeStorage.prototype.getItem = function ( key ) {
		// get by string
		if ( typeof key === 'string' ) {
			// TODO: check how chrome handles this (does it return a value or a object { key: value } ?)
			return this.localStorage.getItem ( key );
		}

		// get by key list
		if ( Object.prototype.toString.call ( key ) === '[object Array]' ) {
			var results = {};
			for ( k in key ) {
				// TODO: check how chrome handles non existing keys
				results[key[k]] = this.localStorage.getItem ( key[k] );
			}

			return results;
		}

		// get by dictionary
		var results = {};
		for ( k in key ) {
			results[k] = this.localStorage.getItem ( k );
			if ( results[k] === null ) {
				// use (provided) default value, if key does not exist in storage
				results[k] = key[k];
			}
		}

		return results;
	};

	ChromeStorage.prototype.setItem = function ( key, value ) {
		//chrome.storage.sync.set ( { key: value } );

		return this.localStorage.setItem ( key, value );
	};

	window.chromeStorage = new ChromeStorage ( localStorage );

} ( window.localStorage ) );