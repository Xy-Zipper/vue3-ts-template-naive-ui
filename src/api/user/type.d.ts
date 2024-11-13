import type { RequestResponse } from '@/es/request.d';
import type { MenuItem } from '../menu/type';

export interface loginParams {
  username: string;
  password: string;
}
export interface codeLoginParams {
  phoneNumber: string;
  code: string;
}

export interface UserInfo {
  id: string;
  phone: string;
  realName: string;
  departmentId?: string[];
  roleId?: string[];
  systemAdministrator: boolean;
  isAdministrator: boolean;
  corpList: string[];
  joinCorpList: string[];
  corpId: string;
  headIcon?: string;
}
export interface CurrentUserType extends RequestResponse {
  data: {
    userInfo: UserInfo;
    menuList: MenuItem[];
  };
}

export interface IUserDetailInfo {
  admission_year: number;
  school: string;
  major: string;
}
