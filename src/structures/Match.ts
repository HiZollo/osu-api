import { Client } from "../Client";
import type { MatchGameData } from "../types/interfaces";
import type { APIMatch } from "../types/osuApiTypes";
import { MatchScore } from "./MatchScore";
import { ModsBitField } from "./ModsBitField";

export class Match {
    public readonly client: Client;
    public readonly id: string;
    public readonly name: string;
    public readonly startAt: Date;
    public readonly endAt: Date | null;
    public readonly games: Array<MatchGameData>
    constructor(client: Client, data: APIMatch) {
        this.client = client;

        const { match, games } = data;
        this.id = match.match_id;
        this.name = match.name;
        this.startAt = new Date(match.start_time);
        if (match.end_time) {
            this.endAt = new Date(match.end_time);
        } else {
            this.endAt = null;
        }

        this.games = games.map(game => {
            return {
                id: game.game_id,
                startAt: new Date(game.start_time),
                endAt: new Date(game.end_time),
                beatmapId: game.beatmap_id,
                mode: +game.play_mode,
                matchType: +game.match_type,
                scoringType: +game.scoring_type,
                teamType: +game.team_type,
                mods: new ModsBitField(game.mods),
                scores: game.scores.map(score => new MatchScore(this.client, score, {
                    mode: +game.play_mode,
                    mapId: game.beatmap_id
                }))
            }
        });

    }
}