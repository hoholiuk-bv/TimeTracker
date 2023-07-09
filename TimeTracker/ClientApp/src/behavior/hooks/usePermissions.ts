import { PermissionType } from '../profile/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const usePermissions = (permissionsToCheck: PermissionType[]): boolean[] => {
  const result: boolean[] = [];
  const { userInfo } = useSelector((state: RootState) => state.profile);
  const userPermissions = userInfo?.permissions;
  for (const permissionToCheck of permissionsToCheck) {
    result.push(userPermissions == null ? false : userPermissions.some(p => p === permissionToCheck));
  }

  return result;
};