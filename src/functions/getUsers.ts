import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
import { UserFromAPI } from '../return-types/User';
import {AuthDetails} from '../types';

export default async function getUsers(authDetails:AuthDetails): Promise<UserFromAPI[]> {
    try {
        const response = await axios({
            method: 'get',
            url: `${authDetails.url}/api/users?expand=permissions`,
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

