import { User } from "../structures/User";
import { FetchUserBannerOptions, GetUserRequestOptions } from "../types/interfaces";
import { APIUser } from "../types/osuApiTypes";
import { Client } from "./Client";
import * as request from 'superagent';
import { CDN } from "../utils/cdn";

export class UserManager {
    public client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    public async getUser(options: GetUserRequestOptions) {
        const queries = {
            u: options.user,
            m: options.gameMode,
            type: options.type,
            event_days: options.eventDays
        }

        const res = await this.client.request({
            path: 'get_user',
            queries
        }) as Array<APIUser>;

        return res.map(v => new User(this.client, v));
    }

    public async fetchBanner({ id }: FetchUserBannerOptions) {
        const context = await request.get(`https://osu.ppy.sh/users/${id}`);
        const banner_regex = new RegExp(`https:\\\\\\/\\\\\\/assets\\.ppy\\.sh\\\\\\/user-profile-covers\\\\\\\/${id}\\\\\\/(?<hash>[0-9a-z]*?)\\.(?<ext>.*?)&`, 'gm');
        const banner = banner_regex.exec(context.text);

        if (banner) {
            const url = CDN.banner(id, banner?.groups?.hash!, banner?.groups?.ext!);
            return url;
        }
        const default_banner_regex = new RegExp('https:\\\\\\/\\\\\\/osu\\.ppy\\.sh\\\\\\/images\\\\\\/headers\\\\\\/profile-covers\\\\\\/c(?<id>\\d)\\.(?<ext>.*?)&', 'gm');
        const defaultBanner = default_banner_regex.exec(context.text);
        const url = CDN.defaultBanner(defaultBanner?.groups?.id!, defaultBanner?.groups?.ext!);
        return url;
    }
}