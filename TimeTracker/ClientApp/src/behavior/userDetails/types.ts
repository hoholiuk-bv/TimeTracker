export type UpdateUserInput = {
    id: string;
    name: string;
    surname: string;
    email: string;
    employmentType: string;
    employmentDate: string;
    isAdmin: boolean;
    isActive: boolean;
    approversIdList: string[];
    hours: number;
    minutes: number;
}

export type UpdateUserType = {
    id: string;
    name: string;
    surname: string;
    email: string;
    employmentType: string;
    employmentDate: string;
    isAdmin: boolean;
    isActive: boolean;
    approversIdList: string[];
    workingHoursCount: number;
}
