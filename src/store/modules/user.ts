import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCurrentUser, getPublicToken, getUserDetailInfo } from '@/api/user'
import type { IUserDetailInfo, UserInfo } from '@/api/user/type'
import type { MenuItem } from '@/api/menu/type'

export default defineStore('user', () => {
  const token = ref<string>()
  const openToken = ref<string>()
  const userInfo = ref<UserInfo>()
  const userDetailInfo = ref<IUserDetailInfo>()
  const menuList = ref<MenuItem[]>()

  function setToken(val: string) {
    token.value = val
  }
  async function getUserInfo() {
    if (!token.value) return {}
    const result = await getCurrentUser()
    const {
      data: { list }
    } = await getUserDetailInfo(result.data.userInfo.id)
    if (list.length !== 0) {
      userDetailInfo.value = list[0]
    }
    userInfo.value = result.data.userInfo
    menuList.value = result.data.menuList
    return userInfo.value
  }
  // 用户退出
  async function userLogout(): Promise<void> {
    token.value = ''
    openToken.value = ''
    userInfo.value = undefined
    menuList.value = []
    userDetailInfo.value = undefined
  }

  async function setRequestOpenToken() {
    const { data } = await getPublicToken()
    openToken.value = data
  }
  return {
    token,
    openToken,
    userInfo,
    userDetailInfo,
    getUserInfo,
    setToken,
    userLogout,
    setRequestOpenToken
  }
})
