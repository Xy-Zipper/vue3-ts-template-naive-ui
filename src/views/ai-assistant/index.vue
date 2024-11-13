<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ConversationList from '@/components/ai-assistant/ConversationList.vue'
import useAssistantStore from '@/store/modules/ai-assistant'

const store = useAssistantStore()
const input = ref('')
const answerDone = ref(true)
const isTyping = ref(false)
const chatList = ref(store.storedChatList ?? [])
const chatBodyRef = ref<HTMLElement>()
onMounted(() => {
  // 获取聊天记录
  /*  const storedChatList = store.state.chat.asideChatList
  if (storedChatList) {
    chatList.value = JSON.parse(storedChatList)
  } else {
    chatList.value = []
  } */
  scrollToBottom()
})

function start() {
  chatList.value.push({
    class: 'chat-human',
    content: input.value,
    empty: false,
    showContent: false
  })
  chatList.value.push({ class: 'bot-massage', content: '' })
  initializeSession(input.value)
  scrollToBottom()
  input.value = ''
}
async function initializeSession(question: string) {
  try {
    answerDone.value = false
    isTyping.value = true // 开始输入，显示光标

    const response = await fetch('http://xxxx/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer fastgpt-rYyGqH8OYT3wcJ077Dyg2PRNwm0cYis8m2qO8ZE71wJNRtz0Cm5gGJ2tscYuQsN'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        detail: true,
        stream: true
      })
    })

    if (!response.ok) {
      console.error('会话初始化失败:', response.statusText)
      return
    }

    const reader = response.body!.getReader()
    const decoder = new TextDecoder('utf-8')

    // 使用一个变量来存储最新的结果
    let result = ''

    // 逐块读取数据
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      // 停止回答
      if (!isTyping.value) {
        answerDone.value = true
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      result = processChunk(chunk, result) // 更新 result
    }

    // 处理完成后，隐藏光标
    // isTyping.value = false
  } catch (error) {
    console.error('请求失败:', error)
    isTyping.value = false // 在请求失败时也隐藏光标
  }
}
function processChunk(chunk: string, currentResult: string) {
  const flowNodeEvents = chunk.split('event: flowNodeStatus')
  const answerEvents = chunk.split('event: answer')

  // 处理 flowNodeStatus 事件
  flowNodeEvents.forEach((event, index) => {
    if (index === 0) return // 跳过第一个分割部分

    const jsonData = event.split('data: ')[1]
    if (jsonData) {
      try {
        const parsedData = JSON.parse(jsonData.trim())
        if (parsedData.name) {
          updatechatList(parsedData.name)
        }
      } catch (error) {
        console.error('解析 flowNodeStatus JSON 失败:', error, '原始数据:', jsonData)
      }
    }
  })

  // 处理 answer 事件
  answerEvents.forEach((event, index) => {
    if (index === 0) return // 跳过第一个分割部分
    const jsonData = event.split('data: ')[1]
    if (jsonData) {
      // 检查是否包含 "[DONE]"
      if (jsonData.includes('[DONE]')) {
        store.SET_CHAT_LIST(chatList.value)
        answerDone.value = true
        isTyping.value = false // 隐藏光标
        // return currentResult // 返回当前结果
      }

      // 处理有效的 JSON 数据
      try {
        const parsedData = JSON.parse(jsonData.trim())
        const content = parsedData.choices[0].delta.content
        const finishReason = parsedData.choices[0].finish_reason

        // 如果 finish_reason 是 "stop"，则停止处理
        if (finishReason === 'stop') {
          isTyping.value = false // 隐藏光标
          // return currentResult // 返回当前结果
        }

        // 确保 content 是有效的 Markdown 字符串
        if (typeof content === 'string') {
          // eslint-disable-next-line no-param-reassign
          currentResult += content // 累加内容
          updatechatList(currentResult) // 更新聊天列表
        }
      } catch (error) {
        console.error('解析 answer JSON 失败:', error, '原始数据:', jsonData)
      }
    }
  })

  return currentResult // 返回更新后的 result
}

// 更新聊天列表的函数
function updatechatList(content: string) {
  chatList.value[chatList.value.length - 1].content = content
  scrollToBottom() // 更新内容后滚动到底部
}

// 滚动到底部的函数
function scrollToBottom() {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
  })
}
</script>

<template>
  <div class="chat-wrap">
    <div class="flex">
      <div class="data">
        <img src="@/assets/imgs/ai-assistant/data.png" class="img" />
      </div>
      <div class="tip">智能数据助手</div>
      <div class="tip1">支持多维度分析</div>
    </div>
    <div class="input-wrap">
      <input v-model="input" class="input-wrap-in" type="text" placeholder="请输入您的问题" />
      <button class="input-wrap-start" @click="start">开始分析</button>
    </div>
    <div class="message-list">
      <div v-if="chatList.length === 0" class="empty">
        <img src="@/assets/imgs/ai-assistant/empty.png" alt="" />
        <div class="text">智能数据助手</div>
      </div>
      <div v-else ref="chatBodyRef" class="chat-body">
        <ConversationList :list="chatList" :is-typing="isTyping" :answer-done="answerDone" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 样式 */
.chat-wrap {
  width: 100%;
  height: calc(100% - 110px);
  position: absolute;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 10px 15px 1px rgba(199, 199, 199, 0.14);
  border-radius: 10px 10px 10px 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  .data {
    margin-right: 8px;
    height: 30px;
    display: flex;
    align-items: center;
    .img {
      width: 23px;
      height: 23px;
    }
  }
  .tip {
    margin-right: 7px;
    font-weight: bold;
    font-size: 18px;
    color: #333333;
    height: 30px;
    display: flex;
    align-items: center;
  }
  .tip1 {
    font-weight: 400;
    font-size: 16px;
    color: #999999;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .input-wrap {
    display: flex;
    margin-top: 28px;
    &-in {
      width: 650px;
      height: 50px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #c4c4c4;
      font-size: 16px;
      padding-left: 18px;
    }
    &-start {
      margin-left: 30px;
      width: 115px;
      height: 48px;
      background: #3a7fff;
      border-radius: 24px 24px 24px 24px;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
    }
  }
  .message-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .empty {
      margin-top: 112px;
      text-align: center;
      img {
        width: 80%;
        height: 395px;
      }
      .text {
        font-weight: bold;
        font-size: 34px;
        color: #333c55;
      }
    }
  }
}
.chat-body {
  height: calc(900px - 108px);
  width: calc(100% - 400px);
  overflow-y: scroll; /* 允许垂直滚动 */
  padding-bottom: 50px;
  margin-top: 5px;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    width: 0; /* 隐藏滚动条的宽度 */
    background: transparent; /* 背景透明 */
  }
}
</style>
