import { AuthDetails } from '../types';

import { UserFromAPI } from './User';
export interface CertFromAPI {
    id: number;
    created_on: string;
    modified_on: string;
    owner_user_id: number;
    provider: string; //letsencrypt, 
    nice_name: string;
    domain_names: string[];
    expires_on: string; //2023-01-23 15:16:38
    meta: {
        letsencrypt_email: string;
        letsencrypt_agree: boolean;
        dns_challenge: boolean
    };
    owner: UserFromAPI;
}
export default class Cert {
    constructor(data: CertFromAPI) {
 
    }

  
}