import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
import { Details, CustomLocations, SSL, AuthDetails } from '../types';
import ProxyHost, { ProxyHostFromAPI } from '../return-types/ProxyHost';
import getUsers from '../functions/getUsers';
import { UserFromAPI } from '../return-types/User';
import { AccessListFromAPI } from '../return-types/AccessList';
import getAccessLists from '../functions/getAccessLists';
import { CertFromAPI } from '../return-types/Cert';
import getCertificates from '../functions/getCertificates';
export default async function createProxyHost(authDetails: AuthDetails, Details: Details, CustomLocations: CustomLocations[] | null, SSL: SSL | null): Promise<ProxyHost> {
    try {
        let detailsData = {
            //Details
            domain_names: Details.domains,
            forward_scheme: Details.https ? 'https' : 'http',
            forward_host: Details.host,
            forward_port: Details.port,
            caching_enabled: Details.cacheAssets,
            block_exploits: Details.blockCommonExploits,
            allow_websocket_upgrade: Details.websocketsSupport,
            access_list_id: Details.accessList

        }
        let customLocations = CustomLocations ? CustomLocations.map((config) => ({
            path: config.location,
            advanced_config: '',
            forward_scheme: config.https ? 'https' : 'http',
            forward_host: config.host,
            forward_port: config.port.toString(),
        })) : [];

        let SSLData = {
            certificate_id: SSL ? SSL.certID : undefined,
            ssl_forced: SSL ? SSL.forceSSL : false,
            http2_support: SSL ? SSL.HTTP2Support : false,
            hsts_enabled: SSL ? SSL.HSTSEnabled : false,
            hsts_subdomains: SSL ? SSL.HSTSSubdomains : false
        }

        const response = await axios({
            method: 'post',
            url: `${authDetails.url}/api/nginx/proxy-hosts`,
            headers: {
                'User-Agent': `${packageJson.name}/${packageJson.version}`,
                'authorization': `Bearer ${authDetails.token}`
            },
            data: {
                ...detailsData,
                "locations": customLocations,
                ...SSLData,
                "advanced_config": "",
                "meta": {
                    "letsencrypt_agree": false,
                    "dns_challenge": false
                },
            }

        });

        const proxyFromAPI: ProxyHostFromAPI = response.data;
        const users: UserFromAPI[] = await getUsers(authDetails);
        const accessLists: AccessListFromAPI[] = await getAccessLists(authDetails);
        const certs: CertFromAPI[] = await getCertificates(authDetails);

        return new ProxyHost(proxyFromAPI, users.filter(user => user.id == proxyFromAPI.owner_user_id)[0], accessLists.filter(ac => ac.id == proxyFromAPI.access_list_id)[0], certs.filter(cert => cert.id == proxyFromAPI.certificate_id)[0]);
    } catch (err) {
        throw err;
    }

}