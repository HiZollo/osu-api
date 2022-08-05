import type { APIGetScoresRequestOptions, GetScoreRequestOptions } from "../types/interfaces";
import type { APIBeatmapScore } from "../types/osuApiTypes";
import { ModsBitField } from "../structures/ModsBitField";
import { BeatmapScore } from "../structures/BeatmapScore";
import { BaseManager } from "./BaseManager";

export class ScoreManager extends BaseManager {
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