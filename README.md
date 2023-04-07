# Nginx Proxy Manager (NPM)
a small package to interact with the popular reverse proxy software https://nginxproxymanager.com/



## get started

```js

const nginxproxymanager = require('nginxproxymanager');

const url = "https://npm.mydomain.com/";

//change these to your details i reccomend you make a separate account too
const username = "admin";
const password = "Password123";

const npm = new nginxproxymanager(url, username, password);

async function getMyProxyHosts() {
    const limit = 3;
    const proxyHosts = await npm.getProxyHosts(limit);

    console.log(proxyHosts);
}

getMyProxyHosts();
```


## Documentation

for documentation see [https://404invalid-user.github.io/nginx-proxy-manager]

## TODO
- [ ] docs
- [ ] examples
- [ ] caching - avoid making requests all the time

- [ ] proxyHosts
  - [x] read
  - [x] create
  - [ ] edit
  - [ ] delete

- [ ] RedirectionHosts
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] Streams
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] 404Hosts
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] Certs
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] users
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] proxyAccessList
  - [ ] read
  - [ ] create
  - [ ] edit
  - [ ] delete

- [ ] me
  - [ ] check permissions for doing things
  - [ ] return details