import { AuthDetails } from '../types';


export interface UserFromAPI {
    id: number;
    created_on: string;
    modified_on: string;
    is_disabled: number;
    email: string;
    name: string;
    nickname: string;
    avatar: string;
    roles: string[];
    permissions: {
        visibility: string;
        proxy_hosts: string;
        redirection_hosts: string;
        dead_hosts: string;
        streams: string;
        access_lists: string;
        certificates: string;
    }
}


export default class User {
    id: number;
    name: string;
    nickname: string;
    avatar: string;
    email: string;
    disabled: boolean
    authDetails: AuthDetails;
    created_on: string;
    modified_on: string;
    admin: boolean
    permissions: {
        visibility: string;
        proxy_hosts: string;
        redirection_hosts: string;
        dead_hosts: string;
        streams: string;
        access_lists: string;
        certificates: string;
    }

    constructor(data: UserFromAPI) {
    }

    save(): void {
        // use url and token properties here
        console.log(this.authDetails.url, this.authDetails.token);
    }
}