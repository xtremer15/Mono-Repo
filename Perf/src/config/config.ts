import Config from "../common/interfaces/config.interface";
import devConfig from "../env/dev_config.json";
import qaConfig from "../env/qa_config.json";

export class ConfigLoader {
    private config!: Config;

    public loadConfig(): Config {
        // Read target env from CLI (k6 run -e TARGET_ENV=qa), default to 'dev'
        const targetEnv = __ENV.TARGET_ENV || 'dev';

        let baseConfig: Config;

        if (targetEnv === 'qa') {
            baseConfig = qaConfig as Config;
        } else {
            baseConfig = devConfig as Config;
        }

        this.config = {
            ...baseConfig,
            baseUrl: __ENV.BASE_URL || baseConfig.baseUrl,
            env: targetEnv
        };

        return this.config;
    }
}
