import type { APIGetScoresRequestOptions, GetScoreRequestOptions } from "../types/interfaces";
import type { Client } from "../Client";
import type { APIBeatmapScore } from "../types/osuApiTypes";
import { ModsBitField } from "../structures/ModsBitField";
import { BeatmapScore } from "../structures/BeatmapScore";

export class ScoreManager {
    public readonly client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    public async getScores(options: GetScoreRequestOptions) {
        const mods = options.mods == undefined 
            ? undefined : ModsBitField.resolve(options.mods);
        const queries = {
            b: options.beatmapId,
            u: options.user,
            m: options.mode,
            mods: mods,
            type: options.type,
            limit: options.limit
        }

        const res = await this.client.request<APIGetScoresRequestOptions>({
            path: 'get_scores',
            queries
        }) as Array<APIBeatmapScore>;

        return res.map(v => new BeatmapScore(this.client, v, { mapId: options.beatmapId, mode: options.mode }));
    }
}