import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';

import { ProxyHostFromAPI } from '../return-types/ProxyHost';
import { AuthDetails } from '../types';


export default async function getProxyHosts(authDetails: AuthDetails): Promise<ProxyHostFromAPI[]> {
    try {
        const response = await axios({
            method: 'get',
            url: `${authDetails.url}/api/nginx/proxy-hosts?expand=owner,access_list,certificate`,
            headers: {
                'User-Agent': `${packageJson.name}/${packageJson.version}`,
                'authorization': `Bearer ${authDetails.token}`
            },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
