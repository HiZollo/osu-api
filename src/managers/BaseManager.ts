import type { Client } from "../Client";

export abstract class BaseManager {
    public readonly client: Client;
    constructor(client: Client) {
        this.client = client;
    }
}