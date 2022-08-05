import { User } from "../structures/User";
import type { APIGetUserBestRequestOptions, APIGetUserRequestOptions, FetchUserBannerOptions, GetUserBestRequstOptions, GetUserRequestOptions } from "../types/interfaces";
import type { APIUser, APIUserBestPerformanceScore } from "../types/osuApiTypes";
import type { Client } from "./Client";
import * as request from 'superagent';
import { CDN } from "../utils/cdn";
import { BeatmapScore } from "../structures/BeatmapScore";

export class UserManager {
    public readonly client: Client;
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

        const res = await this.client.request<APIGetUserRequestOptions>({
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

    public async getUserBest(options: GetUserBestRequstOptions) {
        const queries = {
            u: options.user,
            m: options.mode,
            type: options.type,
            limit: options.limit
        }

        const res = await this.client.request<APIGetUserBestRequestOptions>({
            path: 'get_user_best',
            queries
        }) as Array<APIUserBestPerformanceScore>;

        return res.map(v => new BeatmapScore(this.client, v, { mode: options.mode }));
    }

}