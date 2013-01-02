# TODO:
- handle different parameters for `setItem`:
  - setItem ( key, value )
  - setItem ( { key: value } )
  - setItem ( { key: value, key2: value2 } )
- handle changes to sync storage (update local storage from it): `chrome.storage.onChanged.addListener` ...
- probably have to handle "startup" syncing of localstorage with sync 
- add `clear` & `removeItem` functions

# To test:
- handle different parameters to `getItem`: `array of string` or `string` or `object keys` (as per [https://developer.chrome.com/extensions/storage.html](https://developer.chrome.com/extensions/storage.html))
  - getItem ( 'key' )
  - getItem ( { key: value } )
  - getItem ( { key: value, key2: value2 } )
  - getItem ( [ key, key2 ] )