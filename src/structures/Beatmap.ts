import type { Client } from "../Client";
import type { BeatmapDiffculty, BeatmapObjectCount } from "../types/interfaces";
import type { APIBeatmap } from "../types/osuApiTypes";
import type { User } from "./User";
import { BeatmapApprovedState, BeatmapGenre, BeatmapLanguage, GameMode, UserRequestType } from "../types/enums";
import { URLBuilder } from "../utils/URLBuilder";
import { Beatmapset } from "./Beatmapset";

export class Beatmap {
    public readonly id: string;
    public readonly beatmapsetId: string;
    public readonly approvedState: BeatmapApprovedState;
    public readonly totalLength: number;
    public readonly hitLength: number;
    public readonly diffcultyName: string;
    public readonly hash: string;
    public readonly difficulty: BeatmapDiffculty;
    public readonly mode: GameMode;
    public readonly objectCount: BeatmapObjectCount;
    public readonly submitDate: Date;
    public readonly approvedDate: Date | null;
    public readonly lastUpdate: Date;
    public readonly artist: string;
    public readonly title: string;
    public readonly creator: string;
    public readonly creatorId: string;
    public readonly bpm: number;
    public readonly source: string;
    public readonly tags: string[];
    public readonly genre: BeatmapGenre;
    public readonly language: BeatmapLanguage;
    public readonly favoriteCount: number;
    public readonly rating: number;
    public readonly downloadUnavailable: boolean;
    public readonly audioUnavailable: boolean;
    public readonly playcount: number;
    public readonly passcount: number;
    public readonly maxCombo: number | null;
    constructor(public readonly client: Client, data: APIBeatmap) {
        this.id = data.beatmap_id;
        this.beatmapsetId = data.beatmapset_id;
        this.approvedState = +data.approved;
        this.totalLength = +data.total_length;
        this.hitLength = +data.hit_length;
        this.diffcultyName = data.version;
        this.hash = data.file_md5;
        this.difficulty = {
            ApproachRate: +data.diff_approach,
            CircleSize: +data.diff_size,
            OverallDifficulty: +data.diff_overall,
            HPDrainRate: +data.diff_drain,
            aim: +(data.diff_aim ?? 0),
            speed: +(data.diff_speed ?? 0),
            rating: +(data.difficultyrating ?? 0)
        }
        this.mode = +data.mode;
        this.objectCount = {
            circle: +data.count_normal,
            slider: +data.count_slider,
            spinner: +data.count_spinner
        }
        this.submitDate = new Date(data.submit_date);
        if (!data.approved_date) {
            this.approvedDate = null;
        } else {
            this.approvedDate = new Date(data.approved_date);
        }
        this.lastUpdate = new Date(data.last_update);
        this.artist = data.artist;
        this.title = data.title;
        this.creator = data.creator;
        this.creatorId = data.creator_id;
        this.bpm = +data.bpm;
        this.source = data.source;
        this.tags = data.tags.split(' ');
        this.genre = +data.genre_id;
        this.language = +data.language_id;
        this.favoriteCount = +data.favourite_count;
        this.rating = +data.rating;
        this.downloadUnavailable = !!+data.download_unavailable;
        this.audioUnavailable = !!+data.audio_unavailable;
        this.playcount = +data.playcount;
        this.passcount = +data.passcount;
        if (data.max_combo) {
            this.maxCombo = +data.max_combo;
        } else {
            this.maxCombo = null;
        }
    }

    public beatmapsetURL() {
        return URLBuilder.beatmapsetURL(this.beatmapsetId);
    }

    public beatmapURL() {
        return URLBuilder.beatmapURL(this.beatmapsetId, this.id, this.mode);
    }
    
    public coverImageURL() {
        return URLBuilder.beatmapCoverImage(this.beatmapsetId);
    }
    
    public coverThumbnailURL() {
        return URLBuilder.beatmapCoverThumbnail(this.beatmapsetId);
    }
    
    public async getCreator(): Promise<User | undefined> {
        const candidates = await this.client.users.getUser({
            user: this.creatorId,
            type: UserRequestType.Id
        });

        return candidates[0];
    }

    public async getBeatmapset() {
        const set = await this.client.beatmaps.getBeatmaps({
            beatmapsetId: this.beatmapsetId
        });
        
        return new Beatmapset(this.client, this, set);
    }

}