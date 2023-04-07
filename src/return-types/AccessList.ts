import { AuthDetails } from '../types';
import { UserFromAPI } from './User';

export interface AccessListUserFromAPI {
    username: string;
    password: string; //always empty
    hint: string;
}
export interface AccessListFromAPI {
    id: 2,
    created_on: string;
    modified_on: string;
    owner_user_id: number;
    is_deleted: number;
    name: string;
    meta: object[],
    satisfy_any: number;
    pass_auth: number;
    proxy_host_count: number;
    owner: UserFromAPI, 
    items: AccessListUserFromAPI[], 
    clients: null[] //TODO: add to proxy hosts and see what shows up here
}


export default class AccessList {

    constructor(data: AccessListFromAPI) {
    }

    save(): void {
        // use url and token properties here
    }
}