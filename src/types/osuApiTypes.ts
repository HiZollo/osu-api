import type { ScoreRank } from "./enums";

export interface APIUser {
    user_id: string;
    username: string;
    join_date: string;
    count300: string;
    count100: string;
    count50: string;
    playcount: string;
    ranked_score: string;
    total_score: string;
    pp_rank: string;
    level: string;
    pp_raw: string;
    accuracy: string;
    count_rank_ss: string;
    count_rank_ssh: string;
    count_rank_s: string;
    count_rank_sh: string;
    count_rank_a: string;
    country: string;
    total_seconds_played: string;
    pp_country_rank: string;
    events: Array<APIUserEvent>;
}

export interface APIUserEvent {
    display_html: string;
    beatmap_id: string;
    beatmapset_id: string;
    date: string;
    epicfactor: string;
}

export interface APIBeatmap {
    beatmapset_id: string;
    beatmap_id: string;
    approved: '-2' | '-1' | '0' | '1' | '2' | '3' | '4';
    total_length: string;
    hit_length: string;
    version: string;
    file_md5: string;
    diff_size: string;
    diff_overall: string;
    diff_approach: string;
    diff_drain: string;
    mode: string;
    count_normal: string;
    count_slider: string;
    count_spinner: string;
    submit_date: string;
    approved_date: string | null;
    last_update: string;
    artist: string;
    title: string;
    creator: string;
    creator_id: string;
    bpm: string;
    source: string;
    tags: string;
    genre_id: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '9' | '10' | '11' | '12' | '13' | '14';
    language_id: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14';
    favourite_count: string;
    rating: string;
    download_unavailable: '0' | '1';
    audio_unavailable: '0' | '1';
    playcount: string;
    passcount: string;
    max_combo: string | null;
    diff_aim: string | null;
    diff_speed: string | null;
    difficultyrating: string | null;
}

export interface APIBasicScore {
    score: string;
    maxcombo: string;
    count50: string;
    count100: string;
    count300: string;
    countmiss: string;
    countkatu: string
    countgeki: string
    perfect: '0' | '1';
    enabled_mods: string;
    user_id: string;
    date: string;
    rank: keyof typeof ScoreRank;
}

export interface APIUserRecentPlayedScore extends APIBasicScore {
    beatmap_id: string;
}

export interface APIUserBestPerformanceScore extends APIUserRecentPlayedScore {
    score_id: string;
    pp: string;
    replay_available: '0' | '1';
}

export interface APIBeatmapScore extends APIBasicScore {
    score_id: string;
    username: string;
    pp: string;
    replay_available: '0' | '1';
}

export interface APIMatchScore extends Omit<APIBasicScore, "date"> {
    solt: string;
    team: '0' | '1' | '2';
    pass: '0' | '1';
}

export interface APIMatchData {
    match_id: string;
    name: string;
    start_time: string;
    end_time: string | null;
}

export interface APIMatchGameData {
    game_id: string;
    start_time: string;
    end_time: string;
    beatmap_id: string;
    play_mode: '0' | '1' | '2' | '3';
    match_type: string;
    scoring_type: '0' | '1' | '2' | '3';
    team_type: '0' | '1' | '2' | '3';
    mods: string;
    scores: Array<APIMatchScore>;
}

export interface APIMatch {
    match: APIMatchData;
    games: Array<APIMatchGameData>;
}

export interface APIReplay {
    content: string;
}