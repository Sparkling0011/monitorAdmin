<template>
  <div>
    <Overview :tableInfos="tableInfo" v-model:range="range" @update:range="handleRangeChange">
      <template #chart>
        <div class="echart" ref="divElRef" :style="{ height, width }"></div>
      </template>
      <template #tableName><h4>请求列表</h4></template>
    </Overview>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from 'vue';
  import { getRequestErrorList, getRequestDetail } from '@/api/request';
  import { useECharts } from '@/hooks/web/useECharts';
  import Overview from '@/components/Overview/index.vue';
  import { useProjectStore } from '@/store/modules/project';
  import { basicProps } from '../props';
  import { options } from './option';
  import { columns } from './column';

  defineProps(basicProps);

  const range = ref<[number, number]>([1681558250950, Date.now()]);
  const divElRef = ref();
  const projectStore = useProjectStore();
  const { setOptions } = useECharts(divElRef);

  onMounted(() => {
    setOptions(options);
  });

  const handleRangeChange = (value) => {
    range.value = value;
    setOptions(options);
  };

  watchEffect(async () => {
    const listMap = await getRequestDetail({
      pid: projectStore.pid,
      startAt: range.value[0],
      endAt: range.value[1],
    });
    options.xAxis.data = [...Object.keys(listMap)];
    options.series[0].data = [...Object.values(listMap)];
  });

  const params = ref({
    pageSize: 5,
  });

  const loadDataTable = async (res) => {
    const [startAt, endAt] = range.value;
    const query = { startAt, endAt, pid: projectStore.pid };
    return await getRequestErrorList({ ...params.value, ...res, ...query });
  };

  const tableInfo = { request: loadDataTable, columns };
</script>

<style scoped></style>
