import type { User } from './User';
import type { APIUserEvent } from "../types/osuApiTypes";
import type { Beatmap } from './Beatmap';

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

    public async getBeatmap(): Promise<Beatmap | undefined> {
        const candidates = await this.user.client.beatmaps.getBeatmaps({
            beatmapId: this.beatmapId,
            beatmapsetId: this.beatmapsetId,
        });

        return candidates[0];
    }

    public async getBeatmapset() {
        const beatmap = await this.getBeatmap();
        return beatmap?.getBeatmapset();
    }
}