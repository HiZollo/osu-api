import type { Client } from "../Client";
import type { BeatmapScoreOtherInfo } from "../types/interfaces";
import type { APIBeatmapScore, APIUserBestPerformanceScore, APIUserRecentPlayedScore } from "../types/osuApiTypes";
import { URLBuilder } from "../utils/URLBuilder";
import { BaseScore } from "./BaseScore";

export class BeatmapScore extends BaseScore {
    public readonly beatmapId: string;
    public readonly scoreId: string | null = null;
    public readonly username: string | null = null;
    public readonly pp: number | null = null;
    public readonly replayAvailable: boolean | null = null;

    constructor(client: Client, data: APIBeatmapScore, other: BeatmapScoreOtherInfo);
    constructor(client: Client, data: APIUserBestPerformanceScore, other: BeatmapScoreOtherInfo);
    constructor(client: Client, data: APIUserRecentPlayedScore, other: BeatmapScoreOtherInfo);

    constructor(
        client: Client, 
        data: APIBeatmapScore | APIUserBestPerformanceScore | APIUserRecentPlayedScore, 
        other: BeatmapScoreOtherInfo
    ) {
        super(client, data, other.mode);

        if ('beatmap_id' in data) {
            this.beatmapId = data.beatmap_id;
        } else {
            this.beatmapId = other.mapId!;
        }
        
        if ('score_id' in data) {
            this.scoreId = data.score_id;
        }

        if ('username' in data) {
            this.username = data.username;
        }

        if ('pp' in data) {
            this.pp = +data.pp;
        }

        if ('replay_available' in data) {
            this.replayAvailable = !!+data.replay_available;
        }
    }

    scoreURL() {
        if (!this.scoreId) return null;
        return URLBuilder.scoreURL(this.mode, this.scoreId);
    }
}