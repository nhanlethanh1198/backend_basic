import { cleanEnv, port, str, num } from "envalid";

const validate = (): void => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production"]
        }),
        PORT: port({ default: 3030 }),
        MONGO_DATABASE_URL: str(),
        POSTGRES_DATABASE_URL: str(),
        POSTGRES_DATABASE_NAME: str(),
        POSTGRES_DATABASE_USERNAME: str(),
        POSTGRES_DATABASE_PASSWORD: str(),
        JWT_SECRET: str(),
        PASS_SECRET: str(),
        SESSION_SECRET: str(),
        SESSION_NAME: str(),
        SESSION_KEYS: str(),
        SESSION_MAX_AGE: num(),
    })
}

export default validate