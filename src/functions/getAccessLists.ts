import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
import { AccessListFromAPI } from '../return-types/AccessList';
import { AuthDetails } from '../types';


export default async function getAccessLists(authDetails: AuthDetails): Promise<AccessListFromAPI[]> {
    try {
        const response = await axios({
            method: 'get',
            url: `${authDetails.url}/api/nginx/access-lists?expand=owner,items,clients`,
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