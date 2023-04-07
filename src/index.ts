import axios from 'axios';
//@ts-ignore
import * as packageJson from '../package.json';

import getProxyHosts from './read/proxyHosts';
import getRedirectionHosts from './read/redirectionHosts';
import createProxyHosts from './create/proxyHosts';

import { Details, CustomLocations, SSL, AuthDetails } from './types';
import ProxyHost from './return-types/ProxyHost';

export default class NginxProxyManager {
    private url: string;
    private token: string;
    private tokenExpire: number;
    private auth: { username: string, password: string };

    constructor(url: string, username: string, password: string) {

        this.url = url;
        this.token = "";
        this.tokenExpire = 0;
        this.auth = {
            username: username,
            password: password,
        };
    }

    async login(): Promise<boolean> {
        try {
            const response = await axios({
                method: 'post',
                url: `${this.url}/api/tokens`,
                headers: {
                    'User-Agent': `${packageJson.name}/${packageJson.version}`
                },
                data: {
                    identity: this.auth.username,
                    secret: this.auth.password
                }

            });

            this.token = response.data.token;
            const date = new Date(response.data.expires);
            const timestamp = date.getTime();
            this.tokenExpire = timestamp;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                throw new Error('Could not login. Is this the correct URL for Nginx Proxy Manager?');
            }
            if (error.response && error.response.status === 400) {
                throw new Error('Could not login. Is your username and password correct?');
            }
            if (error.response && error.response.status === 401) {
                throw new Error('Could not login. Is your username and password correct?');
            }
            throw error;
        }
        return true;
    }

    async getProxyHosts(): Promise<ProxyHost[]> {
        if (Date.now() >= this.tokenExpire || this.token == "") await this.login();

        const authDetails: AuthDetails = {
            url: this.url,
            token: this.token,
            tokenExpire: this.tokenExpire,
            login: this.login
        }
        const hosts = await getProxyHosts(authDetails);
        return hosts;
    }

    async saveProxyHost(proxyHost: ProxyHost):Promise<boolean> {
        if (!(proxyHost instanceof ProxyHost)) {
            throw new Error('cant save proxyHost must be an instance of ProxyHost');
        }

        return true;
    }

    async createProxyHost(Details: Details, CustomLocations: CustomLocations[] | null, SSL: SSL | null): Promise<ProxyHost> {
        if (Date.now() >= this.tokenExpire || this.token == "") await this.login();
        const authDetails: AuthDetails = {
            url: this.url,
            token: this.token,
            tokenExpire: this.tokenExpire,
            login: this.login
        }
        const host = await createProxyHosts(authDetails, Details, CustomLocations, SSL);
        return host;
    }

    
    async getRedirectionHosts(): Promise<object[]> {
        if (Date.now() >= this.tokenExpire || this.token == "") await this.login();
        const hosts = await getRedirectionHosts(this.url, this.token);
        return hosts;

    }

}
module.exports = NginxProxyManager;