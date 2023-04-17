<template>
  <div>
    <n-layout>
      <n-layout-header
        ><n-grid x-gap="12" :cols="2">
          <n-gi>
            <h1 class="m-0">项目列表</h1>
          </n-gi>
          <n-gi>
            <div class="flex flex-row-reverse items-center">
              <n-button type="primary" @click="active = !active"> 新建项目 </n-button>
            </div>
          </n-gi>
        </n-grid></n-layout-header
      >
      <n-layout>
        <n-layout-content content-style="padding: 24px;"> <BasicList /></n-layout-content>
      </n-layout>
    </n-layout>
    <n-drawer v-model:show="active" :width="1000">
      <n-drawer-content>
        <template #header> 新建项目 </template>
        <div>
          <CreateStep :step-info="stepInfo" v-model:active="active" @update:active="handle" />
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import CreateStep from './create/CreateStep.vue';
  import BasicList from '../../list/basicList/index.vue';
  import { StepInfo } from './create/step';
  const active = ref(false);
  const stepInfo = ref<StepInfo[]>([
    { title: '创建应用', description: '您首先需要创建一个前端监控应用。' },
    { title: '添加配置', description: '增加你需要的配置' },
    { title: '引入配置', description: '将SDK引入项目中进行监控' },
  ]);
  const handle = (value) => {
    console.log(value);
    active.value = value;
  };
</script>

<style scoped>
  .n-layout-header,
  .n-layout-footer {
    padding: 24px;
  }
  .light-green {
    height: 50px;
    background-color: rgba(0, 128, 0, 0.12);
  }
  .green {
    height: 50px;
    background-color: rgba(0, 128, 0, 0.24);
  }
</style>
