import type { Client } from "../Client";
import type { APIBasicScore } from "../types/osuApiTypes";
import { GameMode, ScoreRank } from "../enums";
import { ModsBitField } from "./ModsBitField";

export abstract class BaseScore {
    public readonly client: Client;
    public readonly score: number;
    public readonly maxCombo: number;
    public readonly count50: number;
    public readonly count100: number;
    public readonly count300: number;
    public readonly countMiss: number;
    public readonly countKatu: number;
    public readonly countGeki: number;
    public readonly perfect: boolean;
    public readonly enabledMod: ModsBitField;
    public readonly userId: string;
    public readonly date: Date;
    public readonly rank: ScoreRank;
    public readonly mode: GameMode;
    constructor(client: Client, data: APIBasicScore, gameMode: GameMode = GameMode.Standard) {
        this.client = client;
        this.score = +data.score;
        this.maxCombo = +data.maxcombo;
        this.count50 = +data.count50;
        this.count100 = +data.count100;
        this.count300 = +data.count300;
        this.countMiss = +data.countmiss;
        this.countKatu = +data.countkatu;
        this.countGeki = +data.countgeki;
        this.perfect = !!+data.perfect;
        this.enabledMod = new ModsBitField(data.enabled_mods);
        this.userId = data.user_id;
        this.date = new Date(data.date);
        this.rank = ScoreRank[data.rank];
        this.mode = gameMode;
    }
}