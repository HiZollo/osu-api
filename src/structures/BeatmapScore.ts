import type { Client } from "../Client";
import type { BeatmapScoreOtherInfo } from "../types/interfaces";
import type { APIBeatmapScore, APIUserBestPerformanceScore } from "../types/osuApiTypes";
import { URLBuilder } from "../utils/URLBuilder";
import { BaseScore } from "./BaseScore";

export class BeatmapScore extends BaseScore {
    public readonly scoreId: string;
    public readonly beatmapId: string
    public readonly username: string | null;
    public readonly pp: number;
    public readonly replayAvailable: boolean;

    constructor(client: Client, data: APIBeatmapScore, other: BeatmapScoreOtherInfo);
    constructor(client: Client, data: APIUserBestPerformanceScore, other: BeatmapScoreOtherInfo);

    constructor(client: Client, data: APIBeatmapScore | APIUserBestPerformanceScore, other: BeatmapScoreOtherInfo) {
        super(client, data, other.mode);
        if ('beatmap_id' in data) {
            this.beatmapId = data.beatmap_id;
        } else {
            this.beatmapId = other.mapId!;
        }
        
        this.scoreId = data.score_id;

        if ('username' in data) this.username = data.username;
        else this.username = null;

        this.pp = +data.pp;
        this.replayAvailable = !!+data.replay_available;
    }

    scoreURL() {
        return URLBuilder.scoreURL(this.mode, this.scoreId);
    }
}