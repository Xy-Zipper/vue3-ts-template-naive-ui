import { get, post } from '@/config/request';
import type * as PermissionType from './type';

export const getCorpData = () => get<PermissionType.CorpData>('/api/system/corp/getCorp');

// 获取加入的团队列表
export const getJoinedCorpList = () => {
  return get<PermissionType.CorpListData>('/api/system/corp/getCorpList');
};
export const switchCorp = (corpId: string) => {
  return get<string>(`/api/system/corp/switchCorp/${corpId}`);
};
// 获取授权组信息
export const getAuthGroupList = (id: string) => {
  return get<PermissionType.AuthGroupType>(`/api/visualdev/base/getAuthGroupList/${id}`);
};
// 获取部门数据
export const getDepartmentTree = () => {
  return get<PermissionType.DepartmentTree[]>('/api/system/permission/organize/selector');
};
// 根据部门Id获取用户列表 - 分页
export const getUserListByDept = (deptId: string, params: PermissionType.UserListParams) => {
  return post<PermissionType.UserListData>(`/api/system/permission/organize/${deptId}/user`, {
    ...params
  });
};
// 获取角色数据
export const getRoleTree = () => {
  return get<PermissionType.RoleTree[]>('/api/system/permission/role/selector');
};

// 获取用户数据
export const getUserTree = () => {
  return get<{ list: PermissionType.UserTree[] }>('/api/system/permission/users/selector');
};

// 通过id 获取角色/部门/用户 信息
export function getMemberInfo(ids: string[]) {
  return post<PermissionType.MemberInfo, undefined, string[]>('/api/system/permission/users/getMemberName', ids);
}

// 获取当前用户的操作权限
export function getFormOperations(menuId: string) {
  return get<PermissionType.FormOperationData>(`/api/visualdev/form/getAuthority/${menuId}`);
}
