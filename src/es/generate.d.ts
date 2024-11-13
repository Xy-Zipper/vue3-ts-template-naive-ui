import type { BaseFieldSchema } from "./field-conf";
// 上传图片
export interface UploadImage {
  name: string;
  url: string; 
}
// 上传文件
export interface UploadFz {
  uid?: number;
  name: string;
  url: string;
  fileId: string;
  status?: string;
}
export interface UserInfoData {
  id: string;
  phone: string;
  fullName: string;
}