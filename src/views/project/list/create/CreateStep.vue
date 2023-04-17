<template>
  <div class="p-16">
    <n-steps :current="(current as number)" :status="currentStatus">
      <template v-for="(item, index) in props.stepInfo" :key="index">
        <n-step :title="item.title" :description="item.description" />
      </template>
    </n-steps>
    <div class="w-full p-12">
      <div v-show="currentRef === 1" class="flex justify-betweeen w-2/3"
        ><n-input
          autofocus
          v-model:value="projectName"
          type="text"
          placeholder="请输入创建项目的名称"
          clearable
        /><n-button ref="createRef" strong secondary type="primary" @click="handleCreateProject">
          创建应用
        </n-button></div
      >
      <div v-show="currentRef === 2" class="w-2/3">
        <n-checkbox-group v-model:value="options">
          <n-space vertical align="center">
            <n-checkbox value="enablePerf" label="开启性能监控" />
            <n-checkbox value="enableBehavior" label="开启用户行为" />
          </n-space>
        </n-checkbox-group>
      </div>
      <div v-show="currentRef === 3">
        <div class="p-4">
          <div class="font-bold text-lg">1. 引入npm包</div>
          <n-code :code="importCode" language="bash" class="p-4" />
        </div>
        <div class="p-4">
          <div class="font-bold text-lg">2. 初始化</div>
          <n-code :code="initCode" language="javascript" class="p-4" />
        </div>
      </div>
    </div>

    <n-button-group class="w-2/3 m-16 flex justify-around">
      <n-button @click="prev" type="primary" v-show="currentRef !== 1"> 上一步 </n-button>
      <n-button @click="next" type="primary">
        {{ currentRef === stepInfo.length ? '创建' : '下一步' }}
      </n-button>
    </n-button-group>
  </div>
</template>

<script setup lang="ts">
  import { StepsProps, useMessage } from 'naive-ui';
  import { ref, computed } from 'vue';
  import { StepInfo } from './step';
  import { useProjectStore } from '@/store/modules/project';

  const props = defineProps<{ stepInfo: StepInfo[]; active: boolean }>();
  const emits = defineEmits(['update:active']);
  const projectStore = useProjectStore();
  const message = useMessage();

  const currentRef = ref<number>(1);
  const currentStatus = ref<StepsProps['status']>('process');
  const current = currentRef;
  const projectName = ref(null);
  const createRef = ref(null);

  const importCode = `npm install synthetical-monitor`;
  const initCode = computed(() =>
    `import Monitor from "synthetical-monitor";
  Monitor.init({
    pid: ${projectStore.pid},
    ${options.value.includes('enableBehavior') ? 'enableBehavior: true' : ''}
    ${options.value.includes('enablePerf') ? 'enablePerf: true' : ''}
  });
  `.replace(/^\s*[\r\n]/gm, '')
  );

  const options = ref<string[]>([]);

  const prev = () => {
    if (currentRef.value > 1) currentRef.value--;
  };
  const next = () => {
    if (!projectName.value || !projectStore.pid) {
      currentRef.value = 1;
      message.warning('请输入项目名称');
      return;
    }
    if (currentRef.value === props.stepInfo.length) {
      emits('update:active', false);
      message.success('创建成功');
    }
    if (currentRef.value < props.stepInfo.length) currentRef.value++;
  };

  const handleCreateProject = async () => {
    if (projectName.value) {
      await projectStore.createProject(projectName.value);
      message.success('创建成功，请进行下一步配置');
    }
  };
</script>

<style scoped></style>
