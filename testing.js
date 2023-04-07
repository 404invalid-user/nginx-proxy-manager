const NginxProxyManager = require('./dist/index');


async function main() {
    const npm = new NginxProxyManager('https://npm.bruvland.com', 'invaliduser@bruvland.com', '#B%EtYvq8D347&#pN^vBr7#Y');

    const hosts = await npm.getProxyHosts();

    /*
    const reslt = await npm.createProxyHost({
        domains: ['www.example.com', 'example.com'],
        https: false,
        host: "192.168.4.32",
        port: 80,
        cacheAssets: true,
        blockCommonExploits: false,
        websocketsSupport: false,
        accessList: null
    },
    [{
        location: '/hello-world',
        https: false,
        host: '192.168.4.100',
        port: 8080
        }]);
        */

    console.log(hosts[0])

}
main()