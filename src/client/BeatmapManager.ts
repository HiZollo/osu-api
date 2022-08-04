import type { APIGetBeatmapsRequestOptions, GetBeatmapsRequestOptions } from "../types/interfaces";
import type { Client } from "./Client";
import type { APIBeatmap } from "../types/osuApiTypes";
import { toSqlDate } from '../utils/toSqlDate';
import { ModsBitField } from "../structures/ModsBitField";
import { Beatmap } from "../structures/Beatmap";

export class BeatmapManager {
    public readonly client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    public async getBeatmaps(options: GetBeatmapsRequestOptions = {}) {
        const queries = {
            since: options.since && toSqlDate(options.since),
            s: options.beatmapsetId,
            b: options.beatmapId,
            u: options.user,
            type: options.type,
            m: options.mode,
            a: options.showConverted,
            h: options.hash,
            limit: options.limit,
            mods: ModsBitField.resolve(options.mods ?? 0)
        }

        const res = await this.client.request<APIGetBeatmapsRequestOptions>({
            path: 'get_beatmaps',
            queries
        }) as Array<APIBeatmap>;

        return res.map(v => new Beatmap(this.client, v));
    }
}