import type { BaseFieldSchema } from './field-conf'
import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
export interface FormDataConfig {
  formRef: string
  category: string
  formModel: string
  size: string
  labelPosition: string
  labelWidth: number
  formRules: string
  popupType: string
  generalWidth: string
  fullScreenWidth: string
  gutter: number
  disabled: boolean
  span: number
  formBtns: boolean
  cancelButtonText: string
  confirmButtonText: string
  formStyle: string
  idGlobal: number
  //   hideRules: any[];
  dialogTitle: string
  fields: BaseFieldSchema[]
}
// 上传图片
export interface UploadImage {
  name: string
  url: string
  fileId: number
}
// 上传文件
export interface UploadFz {
  uid?: number
  name: string
  url: string
  fileId: string
  status?: string
}
export interface UserInfoData {
  id: string
  phone: string
  fullName: string
}

export interface MenuItem {
  id: string
  fullName: string
  parentId: string
  icon: string
  hasChildren: boolean
  urlAddress: string
  linkTarget: '_self' | '_blank'
  children: MenuItem[] | null
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  iconBackgroundColor: string
  menuId: string | null
  sortCode: number
  description: string
}

export type CustomConfig = {
  cancel?: boolean
  queryKey?: string
  // 不显示错误消息
  unMessage?: boolean
  // 不显示加载中
  unLoading?: boolean
  // 无需鉴权
  unAuth?: boolean
}
export type CustomRequestConfig<T = {}> = {
  [key in keyof T]: T[key]
} & CustomConfig &
  AxiosRequestConfig

export type CustomInternalConfig<T = {}> = {
  [key in keyof T]: T[key]
} & CustomConfig &
  InternalAxiosRequestConfig

export interface GroupItem<T = string> {
  key: '-1' | string
  name: '其他' | string
  list: T[]
}
