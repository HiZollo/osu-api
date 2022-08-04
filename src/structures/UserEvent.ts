import type { User } from './User';
import type { APIUserEvent } from "../types/osuApiTypes";

export class UserEvent {
    public readonly user: User;
    public readonly displayHtml: string;
    public readonly beatmapId: string;
    public readonly beatmapsetId: string;
    public readonly date: Date;
    public readonly epicfactor: number;
    constructor(user: User, data: APIUserEvent) {
        this.user = user;
        this.displayHtml = data.display_html;
        this.beatmapId = data.beatmap_id;
        this.beatmapsetId = data.beatmapset_id;
        this.date = new Date(data.date);
        this.epicfactor = +data.epicfactor;
    }
}