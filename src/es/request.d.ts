import { UserInfoData } from './index.d'

export interface Pagination {
  readonly currentPage: number
  readonly pageSize: number
  readonly total: number
}

export interface DataInfo {
  creatorTime: number
  creatorUserId: UserInfoData
  lastModifyUserId?: UserInfoData
  lastModifyTime?: number
  _id: string
}

export interface ListResult<T = {}> {
  list: T[]
  readonly pagination: Pagination
}

type FilterMethod =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'in'
  | 'nin'
  | 'enable'
  | 'unEnable'
  | 'empty'
  | 'unEmpty'
  | 'range'

export interface FilterType {
  enCode: string
  method: FilterMethod
  type: 'field' | 'custom' | 'systemField'
  value: unknown[]
}

export interface RequestParams {
  readonly menuId: string
  readonly association?: boolean
  readonly authGroupId?: string
  readonly currentPage?: number
  readonly userInfoConvert?: boolean
  readonly pageSize?: number
  readonly connect?: 'and' | 'or'
  readonly sort?: {
    [key: string]: 'asc' | 'desc'
  }
  readonly filter?: FilterType[]
  readonly filterList?: {
    readonly connect?: 'and' | 'or'
    readonly filter?: FilterType[]
  }[]
}

export interface RequestResponse<T = unknown> {
  readonly code: number
  readonly msg: string
  data: T
}
