<template>
  <ClientOnly>
    <div class="code-operate">
      <!-- 效果 -->
      <div class="code-operate-demo">
        <textarea v-if="source"></textarea>
      </div>
      <!-- 操作 -->
      <div class="code-operate-btn" v-show="!show">
        <span @click="() => (show = !show)">查看答案</span>
      </div>
      <!-- 源码 -->
      <div v-show="show" class="code-box" v-html="decodeURIComponent(source)" />

      <Transition name="el-fade-in-linear">
        <div v-show="show" class="hidden-code" @click="show = false">
          <span>隐藏答案</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, ref, computed, getCurrentInstance } from 'vue';
import { useClipboard } from '@vueuse/core';
const vm = getCurrentInstance()!;
const props = defineProps<{
  source: string;
}>();

// 控制源代码是否显示
const show = ref(false);
const operateList = reactive([
  {
    label: '查看答案',
    type: 'code',
  },
]);
</script>

<style scoped lang="scss">
.code-operate {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  &-demo {
    padding: 20px;
    > textarea {
      width: 100%;
      border: 1px solid var(--vp-c-border);
      border-radius: 4px;
      padding: 10px;
    }
  }
  &-btn {
    border-top: 1px solid var(--vp-c-divider);
    padding: 10px;
    display: flex;
    justify-content: center;

    i {
      display: inline-block;
      margin: 0 8px;
      &:hover {
        color: var(--text-color);
      }
    }

    i:last-of-type {
      margin-right: 0;
    }
  }

  .code-box {
    background: var(--vp-c-bg-alt);
    padding: 10px;
    position: relative;

    &::before {
      content: 'md';
      position: absolute;
      top: 5px;
      right: 10px;
      z-index: 2;
      font-size: var(--prism-marker-font-size);
      color: var(--vp-c-text-3);
    }

    :deep(pre) {
      margin: 0;
      white-space: pre-wrap;
      padding: 5px;

      & code {
        padding: 0;
      }
    }
  }

  .hidden-code {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
}
</style>
