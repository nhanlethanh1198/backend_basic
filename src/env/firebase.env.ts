import 'dotenv/config'

import FirebaseValidation from "@/validations/firebase.validation";

class Firebase {

    public static readonly FIREBASE_TYPE: string = process.env.FIREBASE_TYPE!

    public static readonly FIREBASE_PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID!

    public static readonly FIREBASE_PRIVATE_KEY_ID: string = process.env.FIREBASE_PRIVATE_KEY_ID!

    public static readonly FIREBASE_PRIVATE_KEY: string = process.env.FIREBASE_PRIVATE_KEY!

    public static readonly FIREBASE_CLIENT_EMAIL: string = process.env.FIREBASE_CLIENT_EMAIL!

    public static readonly FIREBASE_CLIENT_ID: string = process.env.FIREBASE_CLIENT_ID!

    public static readonly FIREBASE_AUTH_URI: string = process.env.FIREBASE_AUTH_URI!

    public static readonly FIREBASE_TOKEN_URI: string = process.env.FIREBASE_TOKEN_URI!

    public static readonly FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string = process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!

    public static readonly FIREBASE_CLIENT_X509_CERT_URL: string = process.env.FIREBASE_CLIENT_X509_CERT_URL!


    constructor() {
        this.initialise()
    }

    private initialise(): void {
        FirebaseValidation()
    }
}

export default Firebase