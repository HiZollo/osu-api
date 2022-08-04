import { GetUserRequestOptions } from "../types/interfaces";
import { Client } from "./Client";

export class UserManager {
    public client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    public async getUser(options: GetUserRequestOptions) {
        const res = await this.client.request({
            path: 'get_user',
            queries: options
        });

        return res;
    }
}