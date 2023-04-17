<template>
  <div>
    <Overview
      :showFooter="true"
      :showHeader="true"
      :request="loadDataTable"
      :columns="columns"
      v-model:range="range"
      @update:range="handleRangeChange"
    >
      <template #title> 请求总览</template>
      <template #chart>
        <h4>请求趋势图</h4>
        <div class="echart" ref="divElRef" :style="{ height, width }"></div>
      </template>
      <template #tableName><h4>请求列表</h4></template>
    </Overview>
  </div>
</template>

<script setup lang="ts">
  import { h, ref, onMounted, reactive } from 'vue';
  import { NTag } from 'naive-ui';
  import { getRequestErrorList } from '@/api/request';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from '../props';
  import Overview from '@/components/Overview/index.vue';
  import { formatToDate, getInterval } from '@/utils/dateUtil';
  import { useProjectStore } from '@/store/modules/project';

  defineProps(basicProps);

  const columns = [
    {
      title: '请求地址',
      key: 'requestUrl',
      width: 150,
    },
    {
      title: '请求方法',
      key: 'method',
      width: 100,
      render: (row) => {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px',
            },
            type: 'info',
            bordered: false,
          },
          {
            default: () => row.method,
          }
        );
      },
    },
    {
      title: '状态信息',
      key: 'statusText',
      width: 100,
    },
    {
      title: '时间',
      key: 'log_at',
      width: 100,
      render: (record) => formatToDate(new Date(record.log_at)),
    },
  ];
  const range = ref<[number, number]>([1681558250950, Date.now()]);
  const data = ref(getInterval(range.value[0], range.value[1]));
  const divElRef = ref(null);
  const projectStore = useProjectStore();
  const { setOptions } = useECharts(divElRef);

  const options = reactive({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [8, 10, 2, 5, 1],
        type: 'line',
      },
    ],
  });

  onMounted(() => {
    setOptions(options);
  });

  const handleRangeChange = (value) => {
    const [startAt, endAt] = value;
    options.xAxis.data = getInterval(startAt, endAt);
    setOptions(options);
  };

  const params = ref({
    pageSize: 5,
  });

  const loadDataTable = async (res) => {
    const [start_at, end_at] = range.value;
    const query = { start_at, end_at, pid: projectStore.pid };
    return await getRequestErrorList({ ...params.value, ...res, ...query });
  };
</script>

<style scoped></style>
