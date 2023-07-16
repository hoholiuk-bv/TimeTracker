export type CreationInput = {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    employmentType: number | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    approversIdList: string[] | null;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
}
