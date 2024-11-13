import { Md5 } from 'ts-md5';
import type { RequestResponse } from '@/es/request.d';
import { get, post, put } from '@/config/request';
import { createModelData, getModelList } from '../visual';
import type * as UserType from './type';

// 用户登录
export const login = (params: UserType.loginParams) => {
  const { VITE_TENANT_ID } = import.meta.env;
  return post<{ token: string }>(
    `/api/oauth/login?client_id=admin&client_secret=123456&scope=all&grant_type=password&corpId=${VITE_TENANT_ID}`,
    {
      username: params.username,
      password: Md5.hashStr(params.password)
    }
  );
};
// 验证码登录
export const loginByCaptcha = (params: UserType.codeLoginParams) => {
  return post<{ token: string }>(
    '/api/oauth/login',
    { username: params.phoneNumber, code: params.code },
    {
      params: {
        client_id: 'admin',
        client_secret: 123456,
        scope: 'all',
        grant_type: 'sms_code'
      }
    }
  );
};
// 发送验证码
export const sendCaptcha = (phoneNumber: string) => {
  return get(`/api/oauth/sendMsg/${phoneNumber}`);
};

// 获取当前用户信息
export const getCurrentUser = () => get<UserType.CurrentUserType, null>('/api/oauth/currentUserApp');

// 修改密码
export async function updatePassword(userId: string, password: string) {
  return post<RequestResponse<string>>(`/api/mongoSystem/Permission/Users/${userId}/Actions/ResetPassword`, {
    userPassword: Md5.hashStr(password)
  });
}

// 加入企业
export const joinCorp = (code: string) => {
  return get(`/api/system/corp/joinCorp/${code}`);
};
// 创建企业
export const createCorp = (name: string) => {
  return post(`/api/system/corp/create`, { name });
};

// 获取公开Token
export const getPublicToken = () => {
  return get<string>(`/api/oauth/getOpenToken/${import.meta.env.VITE_TENANT_ID}`);
};

// 创建用户详细信息
export const addUserDetailInfo = (data: UserType.IUserDetailInfo) => {
  return createModelData({
    menuId: '669a0b4ac523aa5a70e0a381',
    data: JSON.stringify(data)
  });
};

// 修改用户信息
export const updateUser = (data: UserType.UserInfo) => {
  return put<string>(`/api/system/permission/users/${data.id}`, { ...data });
};

// 获取用户详细信息
export const getUserDetailInfo = async (userId: string) => {
  return await getModelList<UserType.IUserDetailInfo>({
    menuId: '669a0b4ac523aa5a70e0a381',
    filter: [
      {
        enCode: 'creatorUserId',
        method: 'eq',
        type: 'custom',
        value: [userId]
      }
    ]
  });
};
