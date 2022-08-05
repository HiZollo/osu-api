import type { Client } from "../Client";
import type { APIReplay } from "../types/osuApiTypes";
import { Buffer } from 'node:buffer'

export class Replay {
    public readonly client: Client;
    public readonly content: string;
    public readonly stream: Buffer;
    constructor(client: Client, data: APIReplay) {
        this.client = client;
        this.content = data.content;
        this.stream = Buffer.from(this.content, 'base64');
    }
}