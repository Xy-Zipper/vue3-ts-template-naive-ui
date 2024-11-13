import { defineStore } from 'pinia'
import { ref } from 'vue'

type Chat = {
  class: string
  content: string
  empty?: boolean
  showContent?: boolean
}
export default defineStore(
  'assistant',
  () => {
    const storedChatList = ref<Chat[]>([])

    function SET_CHAT_LIST(chatList: Chat[]) {
      storedChatList.value = chatList
    }
    return { storedChatList, SET_CHAT_LIST }
  },
  {
    persist: [
      {
        paths: ['storedChatList'],
        storage: localStorage
      }
    ]
  }
)
