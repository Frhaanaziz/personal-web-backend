declare class CreateAccountDto {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
}
export declare class LoginGoogleDto {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    accounts: CreateAccountDto;
}
export {};
