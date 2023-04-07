import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
import { CertFromAPI } from '../return-types/Cert';
import { AuthDetails } from '../types';


export default async function getCertificates(authDetails: AuthDetails): Promise<CertFromAPI[]> {
    try {
        const response = await axios({
            method: 'get',
            url: `${authDetails.url}/api/nginx/certificates?expand=owner`,
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