import { Details, CustomLocations, SSL } from './types';
export default class NginxProxyMnager {
    private url;
    private token;
    private tokenExpire;
    private auth;
    constructor(url: string, username: string, password: string);
    login(): Promise<boolean>;
    getProxyHosts(): Promise<object[]>;
    getRedirectionHosts(): Promise<object[]>;
    createProxyHost(Details: Details, CustomLocations: CustomLocations[] | null, SSL: SSL | null): Promise<object>;
}
