import { cleanEnv, str, port } from 'envalid'

const validate = (): void => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        PORT: port({ default: 3030 }),
        DATABASE_URL: str(),
        JWT_SECRET: str(),
        PASS_SECRET: str(),
    })
}

export default validate