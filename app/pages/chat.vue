<template>
  <MpFlex direction="column" height="100vh" bg="background.airene">
    <MpFlex p="4" borderBottomWidth="1px" borderColor="border.default">
      <MpText size="h1">Chat with Pixel Airene</MpText>
    </MpFlex>

    <MpFlex flex="1" direction="column" gap="4" overflow="hidden" p="4" mb="10">
      <MpFlex
        bg="background.neutral"
        direction="column"
        borderWidth="1px"
        borderColor="border.brand"
        borderRadius="xl"
        p="4"
        gap="4"
        flex="1"
        overflow="auto"
        minHeight="0"
      >
        <MpAireneChatBubble
          v-for="(m, index) in chat.messages"
          :key="m.id ? m.id : index"
          :id="`chat-bubble-${index}`"
          :variant="m.role === 'user' ? 'question' : 'answer'"
          :title="m.role === 'user' ? 'You' : 'Airene'"
          avatar-src="https://randomuser.me/api/portraits/men/1.jpg"
        >
          <template #text>
            <div
              v-for="(part, partIndex) in m.parts"
              :key="`${m.id}-${part.type}-${partIndex}`"
            >
              <MarkdownRenderer v-if="part.type === 'text'" :text="part.text" />
            </div>
          </template>
        </MpAireneChatBubble>
      </MpFlex>

      <MpAireneChatInput
        id="chat-input"
        v-model="input"
        placeholder="Say something..."
        @send="handleSendMessage"
        @keydown="handleKeydown"
      />
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { Chat } from "@ai-sdk/vue";
import {
  MpAireneChatInput,
  MpAireneChatBubble,
  MpFlex,
  MpText,
} from "@mekari/pixel3";
import MarkdownRenderer from "~/components/MarkdownRenderer.vue";

const input = ref("");
const chat = new Chat({});

const handleSendMessage = () => {
  if (input.value.trim()) {
    chat.sendMessage({ text: input.value });
    input.value = "";
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};
</script>
