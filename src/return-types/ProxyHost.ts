import User, { UserFromAPI } from './User';
import AccessList, { AccessListFromAPI } from './AccessList';
import Cert, { CertFromAPI } from './Cert';
import PathLocation, { LocationFromAPI } from './PathLocation';

interface ProxyHostOwnerFromAPI {
    is_disabled: number;
    name: string;
    nickname: string;
    avatar: string;

}

export interface ProxyHostFromAPI {
    id: number;
    created_on: string;
    modified_on: string;
    owner_user_id: number;
    domain_names: string[];
    forward_host: string;
    forward_port: number;
    access_list_id: number;
    certificate_id: number;
    ssl_forced: number;
    caching_enabled: number;
    block_exploits: number;
    advanced_config: string;
    meta: { letsencrypt_agree: boolean, dns_challenge: boolean };
    allow_websocket_upgrade: number;
    http2_support: number;
    forward_scheme: string;
    enabled: number;
    locations: LocationFromAPI[];
    hsts_enabled: number;
    hsts_subdomains: number;
    certificate: number | null;
    owner: ProxyHostOwnerFromAPI;
    access_list: number | null;
    use_default_location: boolean;
    ipv6: boolean;
}


export default class ProxyHost {
    id: number;
    enabled: boolean;
    owner: User;
    created_on: string;
    modified_on: string;
    domains: string[];
    https: boolean;
    host: string;
    port: number;
    accessList: AccessList;
    certificate: Cert;
    forceSSL: boolean;
    cacheAssets: boolean;
    blockCommonExploits: boolean;
    websocketsSupport: boolean;
    HTTP2Support: boolean;
    HSTSEnabled: boolean;
    HSTSSubdomains: boolean;
    locations: PathLocation[];
    ipv6: boolean;
    useDefaultLocation: boolean;


    constructor(data: ProxyHostFromAPI, owner: UserFromAPI, accessList: AccessListFromAPI, cert: CertFromAPI) {
        this.id = data.id;
        this.enabled = data.enabled == 1 ? true : false;
        this.owner = new User(owner);
        this.created_on = data.created_on;
        this.modified_on = data.modified_on;
        this.domains = data.domain_names;
        this.https = data.forward_scheme === 'https' ? true : false;
        this.host = data.forward_host;
        this.port = data.forward_port;
        this.accessList = new AccessList(accessList);
        this.certificate = new Cert(cert);
        this.forceSSL = data.ssl_forced === 1 ? true : false;
        this.cacheAssets = data.caching_enabled === 1 ? true : false;
        this.blockCommonExploits = data.block_exploits === 1 ? true : false;
        this.websocketsSupport = data.allow_websocket_upgrade === 1 ? true : false;
        this.HTTP2Support = data.http2_support === 1 ? true : false;
        this.HSTSEnabled = data.hsts_enabled === 1 ? true : false;
        this.HSTSSubdomains = data.hsts_subdomains === 1 ? true : false;
        this.locations = data.locations.map(location => new PathLocation(location));
        this.ipv6 = data.ipv6;
        this.useDefaultLocation = data.use_default_location;


    }

    save(): void {
        // use url and token properties here
     //   console.log(this.__authDetails.url, this.__authDetails.token);
    }


}

