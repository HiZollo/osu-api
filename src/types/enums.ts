export enum GameMode {
    Standard, Taiko, Catch, Mania
}

export enum UserRequestType {
    String = 'string', 
    Id = 'id'
}

export const Mods = {
    None           :0n,
    NoFail         :1n << 0n,
    Easy           :1n << 1n,
    TouchDevice    :1n << 2n,
    Hidden         :1n << 3n,
    HardRock       :1n << 4n,
    SuddenDeath    :1n << 5n,
    DoubleTime     :1n << 6n,
    Relax          :1n << 7n,
    HalfTime       :1n << 8n,
    Nightcore      :1n << 9n,
    Flashlight     :1n << 10n,
    Autoplay       :1n << 11n,
    SpunOut        :1n << 12n,
    AutoPilot      :1n << 13n,
    Perfect        :1n << 14n,
    Key4           :1n << 15n,
    Key5           :1n << 16n,
    Key6           :1n << 17n,
    Key7           :1n << 18n,
    Key8           :1n << 19n,
    FadeIn         :1n << 20n,
    Random         :1n << 21n,
    Cinema         :1n << 22n,
    Target         :1n << 23n,
    Key9           :1n << 24n,
    KeyCoop        :1n << 25n,
    Key1           :1n << 26n,
    Key3           :1n << 27n,
    Key2           :1n << 28n,
    ScoreV2        :1n << 29n,
    Mirror         :1n << 30n,
}

export const ModsAbbreviation = {
    NoFail: 'NF',
    Easy: 'EZ',
    TouchDevice: 'TD',
    Hidden: 'HD', 
    HardRock: 'HR',
    SuddenDeath: 'SD',
    DoubleTime: 'DT',
    Relax: 'RX',
    HalfTime: 'HT',
    Nightcore: 'NC',
    Flashlight: 'FL',
    Autoplay: 'AT', 
    SpunOut: 'SO',
    AutoPilot: 'AP', 
    Perfect: 'PF', 
    Key4: '4K', 
    Key5: '5K',
    Key6: '6K',
    Key7: '7K', 
    Key8: '8K',
    FadeIn: 'FI',
    Random: 'RD', 
    Cinema: 'CM',
    Target: 'TP',
    Key9: '9K',
    KeyCoop: 'CP',
    Key1: '1K', 
    Key3: '3K', 
    Key2: '2K', 
    ScoreV2: 'SV2',
    Mirror: 'MR'
  }

export enum BeatmapApprovedState {
    Graveyard = -2,
    WIP,
    Pending,
    Ranked,
    Approved,
    Qualified,
    Loved
}

export enum BeatmapGenre {
    Any, Unspecified, VideoGame, Anime, Rock, Pop, Other, Novelty,
    HipHop = 9, Electronic, Metal, Classic, Folk, Jazz
}

export enum BeatmapLanguage {
    Any, Unspecified, English, Japanese, Chinese,
    Instrumental, Korean, French, German, Swedish,
    Spanish, Italian, Russian, Polish, Other
}

export enum ScoreRank {
    XH, X, SH, S, A, B, C, D, F
}

export enum MatchScoringType {
    Score, Accuracy, Combo, ScoreV2
}

export enum MatchTeamType {
    HeadToHead, TagCoop, TeamVs, TagTeamVs
}

export enum Team {
    None, Blue, Red
}