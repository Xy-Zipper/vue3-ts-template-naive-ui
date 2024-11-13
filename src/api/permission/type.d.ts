import type { FormDataConfig } from '@/es'
import type { Pagination } from '../visual/type.d'
type PermissionType = {
  enCode: string
  fullName: string
}
export interface CorpListData {
  corpList: CorpList[]
  joinCorpList: CorpList[]
  corpId: string
}

export interface CorpList {
  corpId: string
  corpName: string
}
export interface PermissionItem {
  button: PermissionType & { icon: string }[]
  column: PermissionType & { jdcloudKey: string }[]
  itemId: string
}

export interface AuthGroupType {
  authGroupList: AuthGroupItem[]
  formData: FormDataConfig
}
export interface UserListData {
  list: User[]
  pagination: Pagination
}
export interface UserListParams {
  currentPage: number
  pageSize: number
}

export interface User {
  id: string
  userName: string
  realName: string
  departmentId: string[]
  roleId: string[]
  phone: string
  enabledMark: number
  creatorTime: number
  isAdministrator: boolean
}
export interface AuthGroupItem {
  id: string
  type: string
  name: string
  operationAuth: string[]
  fieldAuth: Record<string, number>
}
export interface DepartmentTree {
  id: string
  parentId: string
  hasChildren: boolean
  children?: DepartmentTree[]
  fullName: string
}
export interface RoleTree {
  id: string
  parentId: string
  hasChildren: boolean
  children?: RoleTree[]
  fullName: string
}

export interface UserTree {
  id: string
  parentId: string
  fullName: string
  hasChildren: boolean
  children?: UserTree[]
  type: 'user' | 'role' | 'company'
  icon: string
}
export interface MemberInfo {
  department: {
    id: string
    fullName: string
  }[]
  role: {
    id: string
    fullName: string
  }[]
  user: {
    id: string
    phone: string
    fullName: string
  }[]
}

export interface FormOperationData {
  operationAuth: string[]
  fieldAuth: Record<string, number>
}

export interface CorpData {
  id: string
  creatorTime: number
  corpName: string
  enable: boolean
  departmentId: string[]
}
