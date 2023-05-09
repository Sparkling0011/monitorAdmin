<template>
  <n-grid cols="1" responsive="screen" class="-mt-5">
    <n-grid-item>
      <n-list>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="邮箱">
            <template #description
              ><span class="text-gray-400">设置邮箱，帐号更安全</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="密码">
            <template #description><span class="text-gray-400"></span></template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup></script>
