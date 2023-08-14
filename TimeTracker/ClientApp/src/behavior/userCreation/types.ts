import { UserUpdateInput } from '../userDetails/types';
import { SelectElementOptions } from '../common/types';

type CommonUserCreationFields = {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    employmentType: string | null;
    employmentDate: string | null;
    isAdmin: boolean | null;
    approversIdList: string[] | null;
    daysOffCount: number | null;
};

export type UserCreationInput = CommonUserCreationFields & {
    hours: number | null;
    minutes: number | null;
};

export type UserCreationType = CommonUserCreationFields & {
    workingHoursCount: number | null;
};

export type ApproverInfo = {
    id: string;
    name: string;
    surname: string;
    email: string;
    isActive: boolean;
}

export type UserFormProps = {
    initialValues: UserCreationInput | UserUpdateInput;
    onSubmit: (values: any) => void;
    selectedApprovers: SelectElementOptions[];
    setSelectedApprovers: (options: SelectElementOptions[]) => void;
}
