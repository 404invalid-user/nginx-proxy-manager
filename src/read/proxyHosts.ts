import axios from 'axios';
//@ts-ignore
import * as packageJson from '../../package.json';
import ProxyHost, { ProxyHostFromAPI } from '../return-types/ProxyHost';
import { AuthDetails } from '../types';
import getUsers from '../functions/getUsers';
import getAccessLists from '../functions/getAccessLists';
import getCertificates from '../functions/getCertificates';
import { UserFromAPI } from '../return-types/User';
import { AccessListFromAPI } from '../return-types/AccessList';
import { CertFromAPI } from '../return-types/Cert';
export default async function (authDetails: AuthDetails) {
    try {
        const response = await axios({
            method: 'get',
            url: `${authDetails.url}/api/nginx/proxy-hosts?expand=owner,access_list,certificate`,
            headers: {
                'User-Agent': `${packageJson.name}/${packageJson.version}`,
                'authorization': `Bearer ${authDetails.token}`
            },
        });
        const users: UserFromAPI[] = await getUsers(authDetails);
        const accessLists: AccessListFromAPI[] = await getAccessLists(authDetails);
        const certs: CertFromAPI[] = await getCertificates(authDetails);

        const hosts: ProxyHost[] = await Promise.all(response.data.map(async (host: ProxyHostFromAPI) => {
            const owner: UserFromAPI = users.filter(user => user.id == host.owner_user_id)[0];
            const accessList: AccessListFromAPI = accessLists.filter(acclst => acclst.id == host.access_list_id)[0];
            const cert: CertFromAPI = certs.filter(cert => cert.id == host.certificate_id)[0];
            return new ProxyHost(host, owner, accessList, cert);
        }));
        return hosts;
    } catch (err) {
        throw err;
    }
}