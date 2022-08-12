import type { ClientOptions, OsuApiRequestOptions, RequestOptions } from './types/interfaces';
import request from 'superagent';
import { UserManager } from './managers/UserManager'
import { BeatmapManager } from './managers/BeatmapManager';
import { ScoreManager } from './managers/ScoreManager';
import { ReplayManager } from './managers/ReplayManager';
import { MatchManager } from './managers/MatchManager';

export class Client {
    private apiKey: string;
    public users: UserManager;
    public beatmaps: BeatmapManager;
    public scores: ScoreManager;
    public replays: ReplayManager;
    public matches: MatchManager;
    constructor(options: ClientOptions) {
        this.apiKey = options.apiKey;
        this.users = new UserManager(this);
        this.beatmaps = new BeatmapManager(this);
        this.scores = new ScoreManager(this);
        this.replays = new ReplayManager(this);
        this.matches = new MatchManager(this);
    }

    public async request<T extends OsuApiRequestOptions>(options: RequestOptions<T>) {
        if (!options?.path) throw new Error('MISSING_PATH');
        const response = await request.get(`https://osu.ppy.sh/api/${options.path}`)
            .query({ k: this.apiKey })
            .query(options.queries);

        return response.body;
    }
}