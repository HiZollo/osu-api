import type { Client } from "../Client";
import type { APIBasicScore, APIBeatmapScore, APIMatchScore, APIUserBestPerformanceScore, APIUserRecentPlayedScore } from "../types/osuApiTypes";
import type { BeatmapScoreOtherInfo, GetUserRequestOptions, ScoreStatistics } from "../types/interfaces";
import type { User } from "./User";
import { GameMode, ScoreRank, UserRequestType } from "../types/enums";
import { ModsBitField } from "./ModsBitField";

export type APIScore = 
    APIBasicScore |
    APIUserRecentPlayedScore |
    APIUserBestPerformanceScore | 
    APIBeatmapScore |
    APIMatchScore;

export abstract class BaseScore {
    public readonly client: Client;
    public readonly score: number;
    public readonly maxCombo: number;
    public readonly statistics: ScoreStatistics;
    public readonly perfect: boolean;
    public readonly enabledMods: ModsBitField;
    public readonly userId: string;
    public readonly rank: ScoreRank;
    public readonly mode: GameMode;
    public readonly beatmapId: string;
    constructor(client: Client, data: APIScore, other: BeatmapScoreOtherInfo) {
        this.client = client;
        this.score = +data.score;
        this.maxCombo = +data.maxcombo;
        this.statistics = {
            count50: +data.count50,
            count100: +data.count100,
            count300: +data.count300,
            countMiss: +data.countmiss,
            countKatu: +data.countkatu,
            countGeki: +data.countgeki
        }
        this.perfect = !!+data.perfect;
        this.enabledMods = new ModsBitField(data.enabled_mods);
        this.userId = data.user_id;
        this.rank = ScoreRank[data.rank];
        this.mode = other.mode ?? GameMode.Standard;

        if ('beatmap_id' in data) {
            this.beatmapId = data.beatmap_id;
        } else {
            this.beatmapId = other.mapId!;
        }
    }

    public async getPlayer(options: Omit<GetUserRequestOptions, "user" | "type"> = {}): Promise<User | undefined> {
        const candidates = await this.client.users.getUser({
            user: this.userId,
            type: UserRequestType.Id,
            ...options
        });

        return candidates[0];
    }

    public async getBeatmap() {
        const candidates = await this.client.beatmaps.getBeatmaps({
            beatmapId: this.beatmapId,
            mode: this.mode,
        });

        return candidates[0];
    }

    public getReplay() {
        return this.client.replays.getReplay({
            beatmapId: this.beatmapId,
            user: this.userId,
            type: UserRequestType.Id
        })
    }
}