export interface Details {
    domains: string[];
    https: boolean;
    host: string;
    port: number;
    cacheAssets: boolean;
    blockCommonExploits: boolean;
    websocketsSupport: boolean;
    accessList: number
}

export interface CustomLocations {
    location: string;
    https: boolean;
    host: string;
    port: number;
}


export interface SSL {
    certID: number;
    forceSSL: boolean;
    HTTP2Support: boolean;
    HSTSEnabled: boolean;
    HSTSSubdomains: boolean;
}

export interface AuthDetails {
    url: string;
    token: string;
    tokenExpire: number;
    login: Function;
}