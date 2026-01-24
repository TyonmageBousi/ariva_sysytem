import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string  | null;
            email?: string | null;
            id: string;
        };
    }

    interface User {
        id: string;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {

        id: string;

    }
}