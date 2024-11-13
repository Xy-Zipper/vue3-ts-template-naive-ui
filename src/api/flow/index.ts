import type * as FlowType from './type.d'
import type { ListResult } from '@/es/request'
import { get, post } from '@/config/request'
// 发起流程
export function startFlow(data: FlowType.StartFlowParams) {
  return post('/api/workflow/flowTask/submit', data)
}
// 获取待办数量
export function getTodoCount() {
  return get<number>('/api/workflow/flowTask/auditTotal')
}
// 获取待办列表
export function getTodoList(data: FlowType.TodoListParams) {
  return post<ListResult<FlowType.FlowListData>>('/api/workflow/flowTask/auditList', { ...data })
}
// 获取流程信息
export function getFlowInfo(data: FlowType.FlowInfoParams) {
  return post<FlowType.FlowInfoData>('/api/workflow/flowTask/processInstance', { ...data })
}
// 提交审核
export function submitAudit(data: FlowType.SubmitAuditParams) {
  return post('/api/workflow/flowTask/approve', { ...data })
}

// 回退
export function flowBack(data: FlowType.FlowBackParams) {
  return post('/api/workflow/flowTask/back', { ...data })
}

// 获取我发起的流程
export function getMyFlowList(data: FlowType.MyFlowListParams) {
  return post<ListResult<FlowType.FlowListData>>('/api/workflow/flowTask/startList', { ...data })
}
// 我处理的
export function getMyDealList(data: FlowType.MyFlowListParams) {
  return post<ListResult<FlowType.FlowListData>>('/api/workflow/flowTask/handleList', { ...data })
}
