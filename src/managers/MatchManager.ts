import { BaseManager } from "./BaseManager";
import type { GetMatchRequestOptions } from "../types/interfaces";
import type { APIMatch, APIMatchNotFound } from "../types/osuApiTypes";
import { Match } from "../structures/Match";

export class MatchManager extends BaseManager {
    public async getMatch(options: GetMatchRequestOptions) {
        const queries = {
            mp: options.matchId
        }
        const res = await this.client.request({
            path: 'get_match',
            queries
        }) as APIMatch | APIMatchNotFound;

        if (res.match === 0) { return null; }
        return new Match(this.client, res);
    }
}