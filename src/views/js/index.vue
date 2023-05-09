<template>
  <div>
    <Overview :table-infos="tableInfos" v-model:range="range" @update:range="handleRangeChange">
      <template #chart>
        <div
          ref="chartRef"
          :style="{
            width,
            height,
          }"
        ></div>
      </template>
    </Overview>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watchEffect } from 'vue';
  import Overview from '@/components/Overview/index.vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { getRuntimeErrorList, getIntervalCount } from '@/api/runtime';
  import { useProjectStore } from '@/store/modules/project';
  import { getInterval } from '@/utils/dateUtil';
  import { basicProps } from '../props';
  import { columns } from './columns';
  import { option } from './option';

  defineProps(basicProps);
  const projectStore = useProjectStore();

  const chartRef = ref();
  const { setOptions } = useECharts(chartRef);

  const range = ref<[number, number]>([1681558250950, Date.now()]);
  const handleRangeChange = async (newVal) => {
    range.value = newVal;
    option.xAxis[0].data = getInterval(newVal[0], newVal[1], 1);
    setOptions(option);
  };

  const params = ref({
    pageSize: 5,
  });
  const loadDataTable = async (res) => {
    return await getRuntimeErrorList({
      ...params.value,
      ...{ startAt: range.value[0], endAt: range.value[1], pid: projectStore.pid },
      ...res,
    });
  };
  const tableInfos = {
    columns,
    request: loadDataTable,
  };

  watchEffect(async () => {
    const listMap = await getIntervalCount({
      pid: projectStore.pid,
      startAt: range.value[0],
      endAt: range.value[1],
    });
    option.xAxis[0].data = [...Object.keys(listMap)];
    option.series[0].data = [...Object.values(listMap)];
    setOptions(option);
  });

  onMounted(() => {
    console.log(option);
    setOptions(option);
  });
</script>

<style scoped></style>
