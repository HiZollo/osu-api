import type { APIGetBeatmapsRequestOptions, GetBeatmapsRequestOptions } from "../types/interfaces";
import type { APIBeatmap } from "../types/osuApiTypes";
import { toSqlDate } from '../utils/toSqlDate';
import { ModsBitField } from "../structures/ModsBitField";
import { Beatmap } from "../structures/Beatmap";
import { BaseManager } from "./BaseManager";

export class BeatmapManager extends BaseManager {
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