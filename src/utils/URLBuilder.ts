import { GameMode } from "../types/enums";

export abstract class URLBuilder {
    private static gameModeToURLPattern(mode: GameMode) {
        switch(mode) {
            case GameMode.Standard: return 'osu';
            case GameMode.Taiko: return 'taiko';
            case GameMode.Catch: return 'fruits';
            case GameMode.Mania: return 'mania';
            default: throw new Error('INVALID_GAMEMODE');
        }
    }

    public static avatar(id: string) {
        return `https://a.ppy.sh/${id}`;
    }

    public static profile(idOrName: string) {
        return `https://osu.ppy.sh/users/${idOrName}`;
    }

    public static banner(userId: string, hash: string, ext: string) {
        return `https://assets.ppy.sh/user-profile-covers/${userId}/${hash}.${ext}`;
    }

    public static defaultBanner(id: string, ext: string) {
        return `https://osu.ppy.sh/images/headers/profile-covers/c${id}.${ext}`;
    }

    public static beatmapsetURL(beatmapsetId: string) {
        return `https://osu.ppy.sh/beatmapsets/${beatmapsetId}`;
    }

    public static beatmapURL(beatmapsetId: string, beatmapId: string, mode: GameMode) {
        const m = URLBuilder.gameModeToURLPattern(mode);
        return `https://osu.ppy.sh/beatmapsets/${beatmapsetId}#${m}/${beatmapId}`;
    }

    public static beatmapCoverImage(beatmapsetId: string) {
        return `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`;
    }

    public static beatmapCoverThumbnail(beatmapsetId: string) {
        return `https://b.ppy.sh/thumb/${beatmapsetId}l.jpg`;
    }

    public static scoreURL(mode: GameMode, scoreId: string) {
        const m = URLBuilder.gameModeToURLPattern(mode);
        return `https://osu.ppy.sh/scores/${m}/${scoreId}`;
    }
}