import type { Client } from "../Client";
import type { GameMode, MatchScoringType, Team } from "../types/enums";
import type { APIMatchGameData } from "../types/osuApiTypes";
import type { Beatmap } from "./Beatmap";
import type { Match } from "./Match";
import { MatchScore } from "./MatchScore";
import { ModsBitField } from "./ModsBitField";

export class MatchGame {
    public readonly client: Client;
    public readonly match: Match;
    public readonly id: string;
    public readonly startAt: Date;
    public readonly endAt: Date;
    public readonly beatmapId: string;
    public readonly mode: GameMode;
    public readonly matchType: number;
    public readonly scoringType: MatchScoringType;
    public readonly teamType: Team;
    public readonly mods: ModsBitField;
    public readonly scores: Array<MatchScore>;
    constructor(match: Match, data: APIMatchGameData) {
        this.client = match.client;
        this.match = match;
        this.id = data.game_id;
        this.startAt = new Date(data.start_time);
        this.endAt = new Date(data.end_time);
        this.beatmapId = data.beatmap_id;
        this.mode = +data.play_mode;
        this.matchType = +data.match_type;
        this.scoringType = +data.scoring_type;
        this.teamType = +data.team_type;
        this.mods = new ModsBitField(data.mods);
        this.scores = data.scores.map(score => new MatchScore(this.client, score, {
            mode: +data.play_mode,
            mapId: data.beatmap_id
        }));
    }

    public async getBeatmap(): Promise<Beatmap | undefined> {
        const candidates = await this.client.beatmaps.getBeatmaps({
            beatmapId: this.beatmapId
        });
        return candidates[0];
    }
}