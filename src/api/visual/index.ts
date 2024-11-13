import type * as VisualType from './type'
import { deleteFn, get, post, put } from '@/config/request'
import type { CustomRequestConfig, FormDataConfig } from '@/es'
import type { RequestParams } from '@/es/request'

export function getVisualDevInfo(id: string) {
  return get<{ formData: FormDataConfig }>(`/api/visualdev/base/${id}`)
}
// 通过id获取功能字段
export function getModelFieldById(menuId: string) {
  return get<VisualType.ModelFieldInfo[]>(`/api/visualdev/base/fields/${menuId}`)
}
// 获取数据列表
export function getModelList<T = Record<string, unknown>>(
  params: RequestParams,
  config?: CustomRequestConfig
) {
  return post<VisualType.VisualListData<T>>('/api/visualdev/form/list', { ...params }, config)
}
// 创建数据
export function createModelData(
  params: VisualType.CreateModelDataParams,
  config?: CustomRequestConfig
) {
  return post<string>('/api/visualdev/form/create', params, config)
}

// 新增或者插入 取决于有没有_id
export function batchOperation(params: VisualType.BatchParams, config?: CustomRequestConfig) {
  return post(`/api/visualdev/form/batch_insert_update/${params.menuId}`, params.data, config)
}

// 删除数据
export function deleteModelData(
  params: VisualType.DeleteModelParams,
  config?: CustomRequestConfig
) {
  return deleteFn('/api/visualdev/form/delete', params, config)
}
// 更新数据
export function updateModelData(
  params: VisualType.UpdateModelParams,
  config?: CustomRequestConfig
) {
  return put('/api/visualdev/form/update', params, config)
}
// 去重，获取指定字段的值
export function distinct(params: VisualType.DistinctParams, config?: CustomRequestConfig) {
  return post<string[]>(
    '/api/visualdev/form/distinct',
    {
      ...params,
    },
    config
  )
}

// 获取数据详情
export function getModelDataDetail<T = Record<string, unknown>>(
  params: VisualType.DetailModelParams,
  config?: CustomRequestConfig
) {
  return post<T>(
    '/api/visualdev/form/info',
    {
      ...params,
    },
    config
  )
}

// 批量删除
export function batchDelete(params: VisualType.BatchDeleteParams, config?: CustomRequestConfig) {
  return deleteFn<string>(
    '/api/visualdev/form/deleteBatch',
    {
      ...params,
    },
    config
  )
}
// 定制化接口
export function dataInterface<T = never>(
  params: VisualType.InterfaceParam,
  config?: CustomRequestConfig
) {
  return post<T>(`/api/visualdev/Datainterface/model/${params.id}`, params.data, config)
}

// 定制化接口(可分页)
export function dataPageInterface<T = never>(
  params: VisualType.InterfaceParam,
  config?: CustomRequestConfig
) {
  return post<VisualType.VisualListData<T>>(
    `/api/visualdev/Datainterface/model/${params.id}`,
    params.data,
    config
  )
}
