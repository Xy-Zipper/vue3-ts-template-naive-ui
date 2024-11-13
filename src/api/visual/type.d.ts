import type { FilterType } from '@/es/request'
export interface ModelFieldInfo {
  enCode: string
  value: string
  jdcloudKey: string
  fullName: string
  children?: Omit<ModelFieldInfo, 'children'>[]
}
export interface VisualListData<T> {
  list: T[]
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  pageSize: number
  total: number
}
export interface DetailModelParams {
  _id: string
  authGroupId?: string
  menuId: string
  association?: boolean
  userInfoConvert?: boolean
}
export interface BatchParams {
  menuId: string
  authGroupId?: string
  data: Record<string, unknown>[]
}
export interface CreateModelDataParams extends Record<string, string | undefined> {
  menuId: string
  authGroupId?: string
  data: string
}
export interface DistinctParams {
  connect?: 'and' | 'or'
  field: string
  menuId: string
  filter?: FilterType[]
}

export interface DeleteModelParams {
  _id: string
  authGroupId?: string
  menuId: string
}

export interface UpdateModelParams {
  _id: string
  menuId: string
  authGroupId?: string
  data: string
}

export interface BatchDeleteParams {
  authGroupId?: string
  ids: string[]
  menuId: string
}

export interface InterfaceParam {
  id: string
  data?: Record<string, unknown>
}
