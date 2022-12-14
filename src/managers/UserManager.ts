import type { APIGetUserBestRequestOptions, APIGetUserRecentRequestOptions, APIGetUserRequestOptions, FetchUserBannerOptions, GetUserBestRequestOptions, GetUserRecentRequestOptions, GetUserRequestOptions } from "../types/interfaces";
import type { APIUser, APIUserBestPerformanceScore, APIUserRecentPlayedScore } from "../types/osuApiTypes";
import request from 'superagent';
import { URLBuilder } from "../utils/URLBuilder";
import { BeatmapScore } from "../structures/BeatmapScore";
import { User } from "../structures/User";
import { BaseManager } from "./BaseManager";

export class UserManager extends BaseManager {
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
            const url = URLBuilder.banner(id, banner?.groups?.hash!, banner?.groups?.ext!);
            return url;
        }
        const default_banner_regex = new RegExp('https:\\\\\\/\\\\\\/osu\\.ppy\\.sh\\\\\\/images\\\\\\/headers\\\\\\/profile-covers\\\\\\/c(?<id>\\d)\\.(?<ext>.*?)&', 'gm');
        const defaultBanner = default_banner_regex.exec(context.text);
        const url = URLBuilder.defaultBanner(defaultBanner?.groups?.id!, defaultBanner?.groups?.ext!);
        return url;
    }

    public async getUserBest(options: GetUserBestRequestOptions) {
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

    public async getUserRecent(options: GetUserRecentRequestOptions) {
        const queries = {
            u: options.user,
            m: options.mode,
            type: options.type,
            limit: options.limit
        }

        const res = await this.client.request<APIGetUserRecentRequestOptions>({
            path: 'get_user_recent',
            queries
        }) as Array<APIUserRecentPlayedScore>;

        return res.map(v => new BeatmapScore(this.client, v, { mode: options.mode }));
    }

}