import { DataInfo } from '@/es/request.d'
import { FormDataConfig } from '@/es'

export interface StartFlowParams {
  menuId: string
  formData: Record<string, unknown>
}
export interface TodoListParams {
  currentPage: number
  pageSize: number
  sort: {
    [key: string]: 'asc' | 'desc'
  }
}
export interface FlowListData extends DataInfo {
  currentNode: {
    nodeName: string
    currentNodeId: string
  }[]
  flowState: string
  flowName: string
  id: string
}
export interface FlowInfoParams {
  taskId: string
  nodeId?: string
}

export interface FlowInfoData {
  formData: FormDataConfig
  fieldAuth: Record<string, number>
  flowData: Record<string, unknown>
  moreData: MoreData
}

interface MoreData {
  countersignObj: CountersignObj
  textOpinionObj: TextOpinionObj
  submitObj: SubmitObj
  backObj: BackObj
}

interface BackObj {
  backNode: string
  immutable: boolean
  enable: boolean
  defaultText: string
  text: string
  hasButton: boolean
  backResubmit: 'order' | 'direct'
}

interface SubmitObj {
  immutable: boolean
  enable: boolean
  defaultText: string
  text: string
  hasButton: boolean
}

interface TextOpinionObj {
  quickOption: boolean
  enable: boolean
  textarea: boolean
  defaultText: string
  text: string
  quickOptionList: string[]
  hasButton: boolean
}

interface CountersignObj {
  enable: boolean
  defaultText: string
  text: string
  countersignList: string[]
  hasButton: boolean
}

export interface SubmitAuditParams {
  flowData: Record<string, unknown>
  handleOpinion: string
  quickOption: string
  nodeId: string
  taskId: string
}
export interface FlowBackParams {
  flowData: Record<string, unknown>
  handleOpinion: string
  quickOption: string
  nodeId: string
  taskId: string
}

export interface MyFlowListParams {
  currentPage: number
  pageSize: number
  search: string
  sort: {
    [key: string]: 'asc' | 'desc'
  }
}
