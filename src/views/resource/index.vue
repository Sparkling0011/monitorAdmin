<template>
  <div>
    <Overview :table-infos="tableInfos" v-model:range="range" @update:range="handleRangeChange">
      <template #chart>
        <div ref="resourceRef" :style="{ height }"></div>
      </template>
      <template #tableName><h4>资源加载错误列表</h4></template>
    </Overview>
  </div>
</template>

<script setup lang="ts">
  import Overview from '@/components/Overview/index.vue';
  import * as echarts from 'echarts';
  import { onMounted, ref, watchEffect } from 'vue';
  import { getResourceErrorList, getResourceTrend } from '@/api/resource';
  import { useProjectStore } from '@/store/modules/project';
  import { basicProps } from '../props';
  import { option } from './option';
  import { columns } from './columns';
  import { count } from 'console';

  defineProps(basicProps);
  const height = ref('500px');
  const projectStore = useProjectStore();

  const resourceRef = ref();
  let myChart;

  const range = ref<[number, number]>([1681558250950, Date.now()]);
  const handleRangeChange = async (newVal) => {
    range.value = newVal;
    myChart.setOption(option);
  };

  const params = ref({
    pageSize: 5,
  });
  const loadDataTable = async (res) => {
    return await getResourceErrorList({
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
    const countMap = await getResourceTrend({
      pid: projectStore.pid,
      startAt: range.value[0],
      endAt: range.value[1],
    });
    option.dataset.source[0] = ['resource', ...Object.keys(countMap)];
    let values = Object.values(countMap);
    let scriptArr = ['script'],
      styleArr = ['style'],
      imageArr = ['image'],
      videoArr = ['video'];
    values.forEach((item) => {
      let { script = 0, style = 0, image = 0, video = 0 } = item === 0 ? {} : item;
      scriptArr.push(script);
      styleArr.push(style);
      imageArr.push(image);
      videoArr.push(video);
    });
    option.dataset.source[1] = scriptArr;
    option.dataset.source[2] = styleArr;
    option.dataset.source[3] = imageArr;
    option.dataset.source[4] = videoArr;
    // option.series[0].encode?.value = option.dataset.source[0][1];
    myChart.setOption(option);
  });

  onMounted(() => {
    myChart = echarts.init(resourceRef.value);
    myChart.on('updateAxisPointer', function (event: any) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)',
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });
    myChart.setOption(option);
  });
</script>

<style scoped></style>
