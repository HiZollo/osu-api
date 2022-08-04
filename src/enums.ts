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