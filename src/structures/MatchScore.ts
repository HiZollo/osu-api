import type { Client } from "../Client";
import type { Team } from "../types/enums";
import type { BeatmapScoreOtherInfo } from "../types/interfaces";
import type { APIMatchScore } from "../types/osuApiTypes";
import { BaseScore } from "./BaseScore";

export class MatchScore extends BaseScore {
    public readonly slot: number;
    public readonly team: Team;
    public readonly pass: boolean;
    constructor(client: Client, data: APIMatchScore, other: BeatmapScoreOtherInfo) {
        super(client, data, other);
        this.slot = +data.slot;
        this.team = +data.team;
        this.pass = !!+data.pass;
    }
}