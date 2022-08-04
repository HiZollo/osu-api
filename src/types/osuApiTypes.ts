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
    download_unavailable: string;
    audio_unavailable: string;
    playcount: string;
    passcount: string;
    max_combo: string | null;
    diff_aim: string | null;
    diff_speed: string | null;
    difficultyrating: string | null;
}