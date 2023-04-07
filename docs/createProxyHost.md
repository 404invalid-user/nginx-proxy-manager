
# createProxyHost(<Details: Object>, <CustomLocations: Object>, <SSL: Object>)

create a proxy host 

i try to keep it as close to the ui as possibe 

## parmas

### Details
- `domains` - [Array: String] your array of domains
- `https` - [Boolean] instead of using scheme we use this, true will set the schema to https and false will set the schema to http
- `host` - [String] this is your forward hostname or ip
- `port` - [Int] this is your forward port
- `cacheAssets` - [Boolean] cache assets
- `blockCommonExploits` - [Boolean] block common exploits
- `websocketsSupport` - [Boolean] websockets support
- `accessList` - [null] this is done yet


### example

```js
const Details = {
    domains: ['www.example.com', 'example.com']
    https: false
    host: "",
    port: 80,
    cacheAssets:false,
    blockCommonExploits:false,
    websocketsSupport: false,
    accessList: null
}
```

### CustomLocations
custom locations will be an array of objects what an object would contain:
- `location` - [String] your location /path/to
- `https` - [Boolean] instead of using scheme we use this, true will set the schema to https and false will set the schema to http
- `host` - [String] this is your forward hostname or ip
- `port` - [Int] this is your forward port
### example

```js
const CustomLocations = [{
location: '/hello-world',
https: false,
host: '192.168.4.100',
port: 8080
}]
```


### SSL
note: you can request a new ssl cert here you need to use createCert function
- `certID` - [Int] your SSL certificate id
- `forceSSL` - [Boolean] force a redirect from http to https
- `HTTP2Support` - [Boolean] HTTP/2 Support
- `HSTSEnabled` - [Boolean] HSTS Enabled
- `HSTSSubdomains` - [Boolean] HSTS Subdomains

### example

```js
const SSL = {
    certID: 2,
    forceSSL: true,
    HTTP2Support:false,
    HSTSEnabled:false,
    HSTSSubdomains:false,
}
```

if you dont want to provide something for example CustomLocations simply put null or undefined in its place do not put an empty objectgetProxyHosts