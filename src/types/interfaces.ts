import { MatchScore } from "../structures/MatchScore";
import type { ModsBitField, ModsResolvable } from "../structures/ModsBitField";
import type { GameMode, MatchScoringType, MatchTeamType, UserRequestType } from "./enums";

export interface ClientOptions {
    apiKey: string;
}

export interface FetchUserBannerOptions {
    id: string;
}

export interface UserScoreRankCount {
    ssh: number;
    ss: number;
    sh: number;
    s: number;
    a: number;
}

export interface BeatmapDiffculty {
    ApproachRate: number;
    CircleSize: number;
    HPDrainRate: number;
    OverallDifficulty: number;
    aim: number | null;
    speed: number | null;
    rating: number;
}

export interface BeatmapObjectCount {
    circle: number;
    slider: number;
    spinner: number;
}

export interface RequestOptions<T extends OsuApiRequestOptions> {
    path: string;
    queries: T;
}

export interface BeatmapScoreOtherInfo {
    mapId?: string;
    mode?: GameMode;
}

export interface MatchGameData {
    id: string;
    startAt: Date;
    endAt: Date;
    beatmapId: string;
    mode: GameMode;
    matchType: number;
    scoringType: MatchScoringType,
    teamType: MatchTeamType,
    mods: ModsBitField,
    scores: Array<MatchScore>
}

export interface OsuApiRequestOptions {}

export interface APIGetUserRequestOptions extends OsuApiRequestOptions {
    u: string;
    m?: GameMode;
    type?: UserRequestType;
    event_days?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
}

export interface GetUserRequestOptions {
    user: string;
    gameMode?: GameMode;
    type?: UserRequestType;
    eventDays?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
}

export interface APIGetBeatmapsRequestOptions extends OsuApiRequestOptions {
    since?: string;
    s?: string;
    b?: string;
    u?: string;
    type?: UserRequestType;
    m?: GameMode;
    a?: boolean;
    h?: string
    limit?: number;
    mods?: bigint;
}

export interface GetBeatmapsRequestOptions {
    since?: Date;
    beatmapsetId?: string;
    beatmapId?: string;
    user?: string;
    type?: UserRequestType;
    mode?: GameMode;
    showConverted?: boolean;
    hash?: string;
    limit?: number;
    mods?: ModsResolvable;
}

export interface APIGetScoresRequestOptions extends OsuApiRequestOptions{
    b: string;
    u?: string;
    m?: GameMode;
    mods?: bigint;
    type?: UserRequestType;
    limit?: number;
}

export interface GetScoreRequestOptions {
    beatmapId: string;
    user?: string;
    mode?: GameMode;
    mods?: ModsResolvable;
    type?: UserRequestType;
    limit?: number;
}

export interface APIGetUserBestRequestOptions extends OsuApiRequestOptions {
    u: string;
    m?: GameMode;
    type?: UserRequestType;
    limit?: number;
}

export interface GetUserBestRequstOptions {
    user: string;
    mode?: GameMode;
    type?: UserRequestType;
    limit?: number;
}

export interface APIGetUserRecentRequestOptions extends OsuApiRequestOptions {
    u: string;
    m?: GameMode;
    type?: UserRequestType;
    limit?: number;
}

export interface GetUserRecentRequestOptions {
    user: string;
    mode?: GameMode;
    type?: UserRequestType;
    limit?: number;
}

export interface APIGetReplayRequestOptions extends OsuApiRequestOptions {
    b?: string;
    u?: string;
    m?: GameMode;
    s?: string;
    type?: UserRequestType;
    mods?: bigint;
}

export interface GetReplayRequestOptions {
    beatmapId?: string;
    user?: string;
    mode?: GameMode;
    scoreId?: string;
    type?: UserRequestType;
    mods?: ModsResolvable;
}

export interface APIGetMatchRequestOptions extends OsuApiRequestOptions {
    mp: string;
}

export interface GetMatchRequestOptions {
    matchId: string
}