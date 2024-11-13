<script setup name="ConversationList">
import { marked } from 'marked'
import { onMounted, watch } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  isTyping: {
    type: Boolean,
    required: true
  },
  answerDone: {
    type: Boolean,
    required: false
  }
})

// 监听 answerDone 的变化
watch(
  () => props.answerDone,
  newValue => {
    if (newValue) {
      const lastIndex = props.list.length - 1 // 获取最后一个索引
      if (lastIndex >= 0) {
        // const lastContent = props.list[lastIndex].content // 获取最后一个元素的 content
        // speak(lastContent, lastIndex) // 朗读最后一条消息
      }
    }
  }
)

// 渲染 Markdown 内容的函数
const renderMarkdown = content => {
  return marked(content, { gfm: true, breaks: true })
}

function checkVoice(index) {
  emit('showVoiceContent', index)
}

/* function stopHandle() {
  emit('stopHandleApp')
}
 */
// 创建与聊天项数量相同的状态数组
// const readingStatus = ref(Array(props.list.length).fill(''))
// const isSpeaking = ref(Array(props.list.length).fill(false))
// const voices = ref([]) // 存储可用的语音列表

// function cleanText(text) {
//   // 去除 HTML 标签
//   const strippedText = text.replace(/<[^>]*>/g, '')

//   // 替换特殊字符和链接
//   const cleanedText = strippedText
//     .replace(/\n/g, ' ') // 替换换行符
//     .replace(/\r/g, '') // 替换回车符
//     .replace(/\t/g, ' ') // 替换制表符
//     .replace(/#/g, '') // 去掉 `#`
//     .replace(/\*/g, '') // 去掉 `*`
//     .replace(/_/g, '') // 去掉 `_`
//     .replace(/`/g, '') // 去掉 `` ` ``
//     .replace(/https?:\/\/[^\s]+/g, '') // 去掉 URL
//     .replace(/www\.[^\s]+/g, '') // 去掉以 www 开头的链接
//     .replace(/$$.*?$$$.*?$/g, '') // 去掉 Markdown 格式的链接
//     .trim() // 去除首尾空格

//   return cleanedText
// }

// function speak(text, index) {
//   // const cleanedText = cleanText(text)

//   // 如果当前正在朗读的不是这个索引，停止之前的朗读
//   if (isSpeaking.value.some((speaking, i) => speaking && i !== index)) {
//     speechSynthesis.cancel() // 停止所有朗读
//     isSpeaking.value.forEach((_, i) => {
//       isSpeaking.value[i] = false
//       readingStatus.value[i] = ''
//     })
//   }

//   // 如果当前索引正在朗读，停止朗读
//   if (isSpeaking.value[index]) {
//     speechSynthesis.cancel()
//     isSpeaking.value[index] = false
//     readingStatus.value[index] = ''
//     return
//   }

//   // 开始朗读
//   readingStatus.value[index] = '正在朗读...'
//   isSpeaking.value[index] = true

//   // 创建新的 SpeechSynthesisUtterance 对象
//   const utterance = new SpeechSynthesisUtterance(cleanedText)

//   // 选择的语音
//   const selectedVoice = voices.value.find(voice => voice.lang === 'zh-CN') // 选择中文语音
//   if (selectedVoice) {
//     utterance.voice = selectedVoice
//   }

//   utterance.rate = 1.8
//   utterance.pitch = 1.6

//   // 在朗读结束时更新状态
//   utterance.onend = () => {
//     isSpeaking.value[index] = false
//     readingStatus.value[index] = ''
//   }

//   // 处理错误事件
//   utterance.onerror = event => {
//     if (event.error === 'interrupted') {
//       console.warn('朗读被中断')
//     }
//     isSpeaking.value[index] = false
//     readingStatus.value[index] = ''
//   }

//   speechSynthesis.speak(utterance)
// }

// 确保语音列表已经加载
onMounted(() => {
  // speechSynthesis.onvoiceschanged = () => {
  //   voices.value = speechSynthesis.getVoices() // 获取可用的语音列表
  // }
  console.log(props.list[props.list.length - 1])
})
</script>

<template>
  <div class="chat-list">
    <div v-for="(item, index) in list" :key="index" class="chat-list-item">
      <div v-if="item.class === 'chat-human'" class="chat-human" @click="checkVoice(index)">
        <div class="markdown" v-html="renderMarkdown(item.content)"></div>
      </div>
      <div v-else-if="item.class === 'bot-massage'" class="chat-bot">
        <div>
          <img src="@/assets/imgs/ai-assistant/ai-black.png" class="bot-img" />
        </div>

        <div class="bot-massage">
          <div class="markdown" v-html="renderMarkdown(item.content)"></div>
          <div v-if="isTyping && index === list.length - 1" class="blinking-cursor"></div>
          <!--
 <div class="" @click.stop="speak(item.content, index)">
            <div v-if="readingStatus[index]" class="reading-status read">
              {{ readingStatus[index] }}
            </div>
            <div class="read" v-else>
              朗读
              <img src="../assets/play-voice.png" class="play-icon" width="15px" height="15px" />
            </div>
          </div>
-->
          <!--
 <div>
            <div
              class="read read1"
              v-if="isTyping && index === list.length - 1"
              @click="stopHandle"
            >
              停止生成
            </div>
          </div>
-->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-list {
  overflow-y: auto;
}
.chat-list-item {
  display: flex;
  flex-direction: column;
  .chat {
    &-human {
      padding: 7px 47px 15px 47px;
      background: #6498fb;
      border-radius: 9px;
      align-self: flex-end;
      font-size: 18px;
      margin-bottom: 46px;
      max-width: 1300px;
      line-height: 50px;
      position: relative;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    }
    &-bot {
      display: flex;
      padding-bottom: 10px;
      .bot-img {
        width: 60px;
      }
      .bot-massage {
        padding: 12px 47px 25px 47px;
        background: #ffffff;
        border-radius: 9px;
        align-self: flex-start;
        font-size: 18px;
        margin-bottom: 46px;
        position: relative;
        max-width: 1300px;
        line-height: 50px;
        margin-left: 20px;
        min-height: 60px;
        display: flex;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 添加阴影 */
      }
    }
  }
  .chat-human::after {
    content: '';
    position: absolute;
    bottom: -25px;
    right: 20px;
    border-width: 15px;
    border-style: solid;
    border-color: #6498fb transparent transparent transparent;
  }
  .bot-massage::after {
    content: '';
    position: absolute;
    top: 20px;
    left: -25px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent #ffffff transparent transparent;
  }
}
.voice {
  display: flex;
  text-align: center;
  &-img {
    margin-left: 20px;
    align-items: center;
    display: flex;
  }
}
.blinking-cursor {
  width: 1px;
  margin-top: 14px;
  height: 1em;
  background-color: black;
  animation: blink 1s step-end infinite;
}
.read {
  cursor: pointer;
  background: #ffffff;
  padding: 0 10px;
  border-radius: 9px;
  border: 1px solid #dfe2ea;
  color: #8a95a7;
  position: absolute;
  height: 30px;
  display: flex;
  font-size: 16px;
  align-items: center;
  left: 0px;
  bottom: -40px;
}
.read1 {
  left: 110px;
  min-width: 100px;
}

.read:hover {
  color: #d4237a;
}
.reading-status {
  font-size: 18px;
  color: #d4237a;
}
.play-icon {
  content: url('../assets/play-voice.png');
}

.read:hover .play-icon {
  content: url('../assets/play-voice-hover.png');
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
//  表格
:deep(.markdown table) {
  width: 100%;
  border-collapse: collapse;
}

:deep(.markdown th) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
:deep(.markdown td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

:deep(.markdown th) {
  background-color: #f2f2f2;
}
</style>
