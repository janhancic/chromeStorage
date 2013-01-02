test ( 'initialization', function () {
	equal ( typeof window.chromeStorage, 'object', 'exported to global object' );

	equal ( chromeStorage.constructor.name, 'ChromeStorage', 'is of correct type' );

	equal ( typeof ChromeStorage, 'undefined', 'can not create another instance' );
} );