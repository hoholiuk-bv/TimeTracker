export type UpdateUserInput = {
    id: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    employmentType: string | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    isActive: boolean | null;
    approversIdList: string[] | null;
    hours: number | null;
    minutes: number | null;
}

export type UpdateUserType = {
    id: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    employmentType: string | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    isActive: boolean | null;
    approversIdList: string[] | null;
    workingHoursCount: number | null;
}
