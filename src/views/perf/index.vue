<template>
  <div>
    <Overview :range="range" @update:range="handleRangeChange">
      <template #title> 性能总览 </template>
      <template #chart>
        <div ref="divRef" :style="{ height: customHeight, width }"></div>
      </template>
    </Overview>
  </div>
</template>

<script setup lang="ts">
  import Overview from '@/components/Overview/index.vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { onMounted, ref, watchEffect } from 'vue';
  import { basicProps } from '../props';
  import { getLoadingData } from '@/api/perf';
  import { useProjectStore } from '@/store/modules/project';
  import { option } from './option';

  defineProps(basicProps);

  const projectStore = useProjectStore();

  const customHeight = ref('350px');
  const divRef = ref();
  const range = ref([0, Date.now()]);
  const handleRangeChange = async (newVal) => {
    range.value = newVal;
    await getLoadingData({ pid: projectStore.pid, startAt: newVal[0], endAt: newVal[1] });
  };

  watchEffect(async () => {
    const { info } = await getLoadingData({
      pid: projectStore.pid,
      startAt: range.value[0],
      endAt: range.value[1],
    });
    option.series[0].data = info.length > 0 ? info[0] : [];
    option.series[1].data = info.length > 0 ? info[1] : [];
    setOptions(option);
  });

  const { setOptions } = useECharts(divRef);
  onMounted(() => {
    setOptions(option);
  });
</script>

<style scoped></style>
