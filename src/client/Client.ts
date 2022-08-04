import { ClientOptions, OsuApiRequestOptions, RequestOptions } from '../types/interfaces';
import * as request from 'superagent';
import { UserManager } from './UserManager'

export class Client {
    private apiKey: string;
    public users: UserManager;
    constructor(options: ClientOptions) {
        this.apiKey = options.apiKey;
        this.users = new UserManager(this);
    }

    public async request<T extends OsuApiRequestOptions>(options: RequestOptions<T>) {
        if (!options?.path) throw new Error('MISSING_PATH');
        const response = await request.get(`https://osu.ppy.sh/api/${options.path}`)
            .query({ k: this.apiKey })
            .query(options.queries);

        return response.body;
    }
}