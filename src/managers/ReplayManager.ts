import type { APIGetReplayRequestOptions, GetReplayRequestOptions } from "../types/interfaces";
import type { APIReplay } from "../types/osuApiTypes";
import { ModsBitField } from "../structures/ModsBitField";
import { Replay } from "../structures/Replay";
import { BaseManager } from "./BaseManager";

export class ReplayManager extends BaseManager {
    public async getReplay(options: GetReplayRequestOptions) {
        if ((!options.beatmapId || !options.user) && !options.scoreId) {
            throw new Error('You should provide either beatmapId and user or scordId to get replay')
        }
        const mods = options.mods == undefined 
            ? undefined : ModsBitField.resolve(options.mods);
        const queries = {
            b: options.beatmapId,
            u: options.user,
            m: options.mode,
            s: options.scoreId,
            type: options.type,
            mods: mods
        }

        const res = await this.client.request<APIGetReplayRequestOptions>({
            path: 'get_replay',
            queries
        }) as APIReplay;

        return new Replay(this.client, res);
    }
}