import type { Client } from '../Client';
import type { BeatmapApprovedState, BeatmapGenre, BeatmapLanguage } from '../enums';
import type { Beatmap } from './Beatmap';
import type { User } from './User';
import { UserRequestType } from '../enums';
import { URLBuilder } from '../utils/URLBuilder';

export class Beatmapset {
    public readonly client: Client;
    public readonly beatmaps: Array<Beatmap>;
    public readonly id: string;
    public readonly approvedState: BeatmapApprovedState;
    public readonly length: number;
    public readonly submitDate: Date;
    public readonly approvedDate: Date | null;
    public readonly lastUpdate: Date;
    public readonly artist: string;
    public readonly title: string;
    public readonly creator: string;
    public readonly creatorId: string;
    public readonly source: string;
    public readonly tags: string[];
    public readonly genre: BeatmapGenre;
    public readonly language: BeatmapLanguage;
    public readonly favoriteCount: number;
    public readonly rating: number;
    public readonly downloadUnavailable: boolean;
    public readonly audioUnavailable: boolean;
    constructor(client: Client, data: Beatmap, maps: Array<Beatmap>) {
        this.client = client;
        this.beatmaps = maps;
        this.id = data.beatmapsetId;
        this.approvedState = data.approvedState;
        this.length = data.totalLength;
        this.submitDate = data.submitDate;
        this.approvedDate = data.approvedDate;
        this.lastUpdate = data.lastUpdate;
        this.artist = data.artist;
        this.title = data.title;
        this.creator = data.creator;
        this.creatorId = data.creatorId;
        this.source = data.source;
        this.tags = data.tags.slice();
        this.genre = data.genre;
        this.language = data.language;
        this.favoriteCount = data.favoriteCount;
        this.rating = data.rating;
        this.downloadUnavailable = data.downloadUnavailable;
        this.audioUnavailable = data.audioUnavailable;
    }

    public beatmapsetURL() {
        return URLBuilder.beatmapsetURL(this.id);
    }
    
    public coverImageURL() {
        return URLBuilder.beatmapCoverImage(this.id);
    }
    
    public coverThumbnailURL() {
        return URLBuilder.beatmapCoverThumbnail(this.id);
    }
    
    public async getCreator(): Promise<User | undefined> {
        const candidates = await this.client.users.getUser({
            user: this.creatorId,
            type: UserRequestType.Id
        });

        return candidates[0];
    }
}