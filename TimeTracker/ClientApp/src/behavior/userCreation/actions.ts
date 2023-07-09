import type { CreationInput} from './types';



export const USER_CREATION = 'USER_CREATION' as const;
export const register = (registerInput: CreationInput) => ({
    type: USER_CREATION,
    payload: { registerInput }
});


export type RegisterAction = ReturnType<typeof register>;
export type CreationActions = ReturnType<
    | typeof register>