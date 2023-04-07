import { AuthDetails } from '../types';

export interface LocationFromAPI {
    path: string;
    advanced_config: string;
    forward_scheme: string;
    forward_host: string;
    forward_port: number;
}

export default class PathLocation {

    location: string;
    https: boolean;
    host: string;
    port: number;

    constructor(data: LocationFromAPI) {
        this.location = data.path;
        this.https = data.forward_scheme == 'https' ? true : false;
        this.host = data.forward_host;
        this.port = data.forward_port;
    }

    save(): void {
        // use url and token properties here
    }
}