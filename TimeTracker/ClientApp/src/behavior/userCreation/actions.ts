import type { RegisterInput, User } from '../profile/types';



export const REGISTER = 'REGISTER' as const;
export const register = (registerInput: RegisterInput) => ({
    type: REGISTER,
    payload: { registerInput }
});


export type RegisterAction = ReturnType<typeof register>;
export type CreationActions = ReturnType<
    | typeof register>