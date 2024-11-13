import type { ExportParams, UploadFileResult } from './type.d'
import { get, post } from '@/config/request'

export function getFileStream(url: string) {
  return get<Blob, null>(url, {}, { responseType: 'blob' })
}
// 单文件上传
export function uploadFile(data: FormData) {
  return post<UploadFileResult, undefined, FormData>('/api/file/uploader', data)
}
// 多文件上传
export function uploadMultipleFile(data: FormData) {
  return post<UploadFileResult[], undefined, FormData>('/api/file/uploaderMultiple', data)
}
// 定制接口
export function dataInterface<T>(id: string, data: Record<string, string>) {
  return post<T>(`/api/visualdev/Datainterface/${id}`, data)
}

// 导出数据 - excel
export function exportData(data: ExportParams) {
  return post<Blob, null>('/api/visualdev/form/export', { ...data }, { responseType: 'blob' })
}
