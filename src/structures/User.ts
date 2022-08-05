import type { UserScoreRankCount } from "../types/interfaces";
import type { APIUser } from "../types/osuApiTypes";
import type { Client } from "../Client";
import { UserEvent } from "./UserEvent";
import { URLBuilder } from "../utils/URLBuilder";

export class User {
    public readonly client: Client;

    // User Data
    public readonly id: string;
    public readonly username: string;
    public readonly joinDate: Date;
    public readonly playcount: number;
    public readonly level: number;
    public readonly country: string;
    public readonly playtime: number;
    public readonly events: Array<UserEvent>;
    public banner: string | null;

    // User Score
    public readonly count300: number;
    public readonly count100: number;
    public readonly count50: number;
    public readonly rankedScore: number;
    public readonly totalScore: number;
    public readonly rank: number;
    public readonly countryRank: number;
    public readonly pp: number;
    public readonly accuracy: number;
    public readonly scoreRankCount: UserScoreRankCount;

    constructor(client: Client, data: APIUser) {
        this.client = client;
        this.id = data.user_id;
        this.username = data.username;
        this.joinDate = new Date(data.join_date);
        this.count300 = +data.count300;
        this.count100 = +data.count100;
        this.count50 = +data.count50;
        this.playcount = +data.playcount;
        this.playtime = +data.total_seconds_played;
        this.rankedScore = +data.ranked_score;
        this.totalScore = +data.total_score;
        this.rank = +data.pp_rank;
        this.level = +data.level;
        this.pp = +data.pp_raw;
        this.accuracy = +data.accuracy;
        this.scoreRankCount = {
            ss: +data.count_rank_ss,
            ssh: +data.count_rank_ssh,
            s: +data.count_rank_s,
            sh: +data.count_rank_sh,
            a: +data.count_rank_a
        };
        this.country = data.country;
        this.countryRank = +data.pp_country_rank;
        this.events = data.events.map(v => new UserEvent(this, v));

        this.banner = null;
    }

    public avatarURL() {
        return URLBuilder.avatar(this.id);
    }

    public profileURL() {
        return URLBuilder.profile(this.id);
    }

    public async fetchBanner(force: boolean = false) {
        if (!force && this.banner) return this.banner;
        const url = await this.client.users.fetchBanner({ id: this.id });
        return this.banner = url;
    }
}