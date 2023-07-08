export type RegisterInput = {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    employmentType: number | null;
    isAdmin: boolean | null;
}

export type User = {
    name: string;
    surname: string;
    token: string;
}