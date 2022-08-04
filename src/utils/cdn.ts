export abstract class CDN {
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
}