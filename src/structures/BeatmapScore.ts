import type { Client } from "../client/Client";
import type { APIBeatmapScore } from "../types/osuApiTypes";
import { BaseScore } from "./BaseScore";

export class BeatmapScore extends BaseScore {
    public readonly scoreId: string;
    public readonly beatmapId: string
    public readonly username: string;
    public readonly pp: number;
    public readonly replayAvailable: boolean;
    constructor(client: Client, data: APIBeatmapScore, mapId: string) {
        super(client, data);
        this.beatmapId = mapId;
        this.scoreId = data.score_id;
        this.username = data.username;
        this.pp = +data.pp;
        this.replayAvailable = !!+data.replay_available;
    }
}