import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
export default async function (url: string, token: string) {
    try {
        const response = await axios({
            method: 'get',
            url: `${url}/api/nginx/redirection-hosts?expand=owner,certificate`,
            headers: {
                'User-Agent': `${packageJson.name}/${packageJson.version}`,
                'authorization': `Bearer ${token}`
            },
        });

        return response.data
    } catch (err) {
        throw err;
    }
}
