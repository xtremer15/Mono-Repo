import Config from "../common/interfaces/config.interface";

export class Router {

    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public buildRoute(routeName: string): string {
        // Remove trailing slash from baseUrl if exists, then append routeName
        const base = this.config.baseUrl.replace(/\/$/, "");
        return routeName ? `${base}/${routeName}` : base;
    }

}



export class Routes {
    public static readonly HOMEPAGE = ''
    public static readonly USERS = 'users'
    public static readonly LOGIN = "login"
}