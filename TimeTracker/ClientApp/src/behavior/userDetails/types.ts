type CommonUserUpdateFields = {
    id: string;
    name: string;
    surname: string;
    email: string;
    employmentType: string;
    employmentDate: string;
    isAdmin: boolean;
    isActive: boolean;
    approversIdList: string[];
};

export type UserUpdateInput = CommonUserUpdateFields & {
    hours: number;
    minutes: number;
}

export type UserUpdateType = CommonUserUpdateFields & {
    workingHoursCount: number;
}
