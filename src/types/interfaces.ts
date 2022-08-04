import { GameMode } from "../enums";

export interface ClientOptions {
    apiKey: string;
}

export interface RequestOptions<T extends OsuApiRequestOptions> {
    path: string;
    queries: T;
}

export interface OsuApiRequestOptions {}

export interface GetUserRequestOptions extends OsuApiRequestOptions {
    u: string;
    m?: GameMode;
    type?: 'string' | 'id';
    event_days?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
}