import { GameMode, UserRequestType } from "../enums";

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

export interface RequestOptions<T extends OsuApiRequestOptions> {
    path: string;
    queries: T;
}

export interface OsuApiRequestOptions {}

export interface APIGetUserRequestOptions extends OsuApiRequestOptions {
    u: string;
    m?: GameMode;
    type?: 'String' | 'Id'
    event_days?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
}

export interface GetUserRequestOptions {
    user: string;
    gameMode: GameMode;
    type: UserRequestType;
    eventDays: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
}