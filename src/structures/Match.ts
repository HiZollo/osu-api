import type { APIMatch } from "../types/osuApiTypes";
import type { Client } from "../Client";
import { MatchGame } from "./MatchGame";

export class Match {
    public readonly client: Client;
    public readonly id: string;
    public readonly name: string;
    public readonly startAt: Date;
    public readonly endAt: Date | null;
    public readonly games: Array<MatchGame>
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

        this.games = games.map(data => new MatchGame(this.client, data));

    }
}