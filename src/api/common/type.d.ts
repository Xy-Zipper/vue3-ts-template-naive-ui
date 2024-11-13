import { FilterType } from '@/es/request.d'
export interface UploadFileResult {
  name: string
  url: string
}
export interface DataInterfaceResult<T = unknown> {
  data:
    | {
        list?: T[]
      }
    | T[]
}

export interface ExportParams {
  menuId: string
  filter?: FilterType[]
  connect: 'and' | 'or'
  dataType: ExportDataEnum
  currentPage: number
  pageSize: number
  selectKey: string[]
  sort?: Record<string, 'desc' | 'asc'>
  authGroupId?: string
}
declare enum ExportDataEnum {
  CURRENT_PAGE = 0,
  ALL_DATA = 1,
}
