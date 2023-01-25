import "dotenv/config";

import VariableValidate from "@/validations/variable.validation";

class Variable {
    public static readonly NODE_ENV: string = process.env.NODE_ENV!;

    public static readonly PORT: number = Number(process.env.PORT)!;

    public static readonly MONGO_DATABASE_URL: string = process.env.MONGO_DATABASE_URL!;

    public static readonly JWT_SECRET: string = process.env.JWT_SECRET!;

    public static readonly PASS_SECRET: string = process.env.PASS_SECRET!;

    public static readonly POSTGRES_DATABASE_URL: string = process.env.POSTGRES_DATABASE_URL!;

    public static readonly POSTGRES_DATABASE_NAME: string = process.env.POSTGRES_DATABASE_NAME!;

    public static readonly POSTGRES_DATABASE_USERNAME: string = process.env.POSTGRES_DATABASE_USERNAME!;

    public static readonly POSTGRES_DATABASE_PASSWORD: string = process.env.POSTGRES_DATABASE_PASSWORD!;

    constructor() {
        this.initialise();
    }

    private initialise(): void {
        VariableValidate();
    }
}

export default Variable