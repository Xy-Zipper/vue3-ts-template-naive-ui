import { get } from '@/config/request'
// 获取应用分组
export const getAppGroup = () => get<string>('api/system/permission/users/appGroup')
