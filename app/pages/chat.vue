<template>
  <MpFlex
    direction="column"
    alignItems="center"
    height="calc(100vh - 71px)"
    background="background.airene"
    padding="2"
  >
    <MpFlex
      direction="column"
      :width="{ base: '100%', md: '800px' }"
      height="full"
    >
      <MpFlex gap="2" alignItems="center" p="4" pb="0">
        <MpButton
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="navigateTo('/')"
        />
        <MpText size="h3">Chat with Mekari Pixel MCP</MpText>
      </MpFlex>

      <MpFlex
        flex="1"
        direction="column"
        gap="4"
        overflow="hidden"
        p="4"
        mb="10"
      >
        <MpFlex
          bg="background.neutral"
          flex="1"
          gap="4"
          direction="column"
          p="4"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
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
                <MarkdownRenderer
                  v-if="part.type === 'text'"
                  :text="part.text"
                />
              </div>
            </template>
          </MpAireneChatBubble>
        </MpFlex>

        <MpAireneChatInput
          id="chat-input"
          v-model="input"
          placeholder="Ask something..."
          @send="handleSendMessage"
          @keydown="handleKeydown"
        />
      </MpFlex>
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
  MpButton
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
