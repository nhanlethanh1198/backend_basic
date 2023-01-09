import 'dotenv/config'

import VariableValidate from '@/validations/variable.validation'

class Variable {
    public static readonly NODE_ENV: string = process.env.NODE_ENV!

    public static readonly PORT: number = Number(process.env.PORT)!

    public static readonly DATABASE_URL: string = process.env.DATABASE_URL!

    public static readonly JWT_SECRET: string = process.env.JWT_SECRET!

    public static readonly PASS_SECRET: string = process.env.PASS_SECRET!

    constructor() {
        this.initialise()
    }

    private initialise(): void {
        VariableValidate()
    }
}

export default Variable