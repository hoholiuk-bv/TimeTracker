export type CreationInput = {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    employmentType: string | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    approversIdList: string[] | null;
    hours: number | null;
    minutes: number | null;
}

export type UserCreationType = {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    employmentType: string | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    approversIdList: string[] | null;
    workingHoursCount: number | null;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
}
