export class SystemEnvironment {
    VALID_CORS_ORIGIN: string;
    MAX_URLENCODE_SIZE: string;
    MAX_JSON_SIZE: string;
    NODE_ENV: string;
    TOOBUSY_MAX_LAG: number;
    TOOBUSY_CHECK_INTERVAL: number;
    GRAPHQL_PORT: number;
    APP_PORT: number;


    constructor () {
        this.NODE_ENV = 'debug';          // SysLog mode : debug or production
        this.VALID_CORS_ORIGIN = 'http://localhost:8082';  // CORS URL patch of client server
        this.MAX_URLENCODE_SIZE='100mb';
        this.MAX_JSON_SIZE='100mb';
        this.TOOBUSY_MAX_LAG = 1000;            // maximum lag tolerable in ms
        this.TOOBUSY_CHECK_INTERVAL = 500;      // check interval in ms
        this.GRAPHQL_PORT = 4000;
        this.APP_PORT = 4000;
    }
    init(): void {
        if (process.env.VALID_CORS_ORIGIN !== undefined) {
            this.VALID_CORS_ORIGIN = process.env.VALID_CORS_ORIGIN;
        }
        if (process.env.MAX_URLENCODE_SIZE !== undefined) {
            this.MAX_URLENCODE_SIZE = process.env.MAX_URLENCODE_SIZE;
        }
        if (process.env.MAX_JSON_SIZE !== undefined) {
            this.MAX_JSON_SIZE = process.env.MAX_JSON_SIZE;
        }
        if (process.env.NODE_ENV !== undefined) {
            this.NODE_ENV = process.env.NODE_ENV;
        }
        if (process.env.TOOBUSY_MAX_LAG !== undefined) {
            this.TOOBUSY_MAX_LAG = parseInt(process.env.TOOBUSY_MAX_LAG);
        }
        if (process.env.TOOBUSY_CHECK_INTERVAL !== undefined) {
            this.TOOBUSY_CHECK_INTERVAL = parseInt(process.env.TOOBUSY_CHECK_INTERVAL);
        }
        if (process.env.GRAPHQL_PORT !== undefined) {
            this.GRAPHQL_PORT = parseInt(process.env.GRAPHQL_PORT);
        }
        if (process.env.GRAPHQL_PORT !== undefined) {
            this.GRAPHQL_PORT = parseInt(process.env.GRAPHQL_PORT);
        }
        if (process.env.APP_PORT !== undefined) {
            this.APP_PORT = parseInt(process.env.APP_PORT);
        }
    }
}

const SysEnv = new SystemEnvironment();

export default SysEnv;