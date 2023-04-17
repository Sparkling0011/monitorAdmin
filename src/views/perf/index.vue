<template>
  <div>
    <Overview :show-header="false" :show-footer="false">
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
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  import { basicProps } from '../props';
  defineProps(basicProps);

  const customHeight = ref('350px');

  const divRef = ref(null);

  let option = {
    title: {
      text: '页面加载瀑布图',
      x: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        var tar = params[1];
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      },
    },
    xAxis: {
      name: '加载时间(ms)',
      type: 'value',
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      splitLine: { show: false },
      inverse: true, // 将 yAxis 反向
      data: ['DNS查询', 'TCP连接', '首字节网络请求', '网络请求', '网络响应', 'DOM解析', '资源加载'],
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          // itemStyle: {
          //   borderColor: 'transparent',
          //   color: 'transparent',
          // },
        },
        data: [0, 104, 158, 403, 421, 441, 1442],
      },
      {
        name: '耗时',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'inside',
        },
        data: [93, 43, 245, 18, 24, 796, 2366],
      },
      // {
      //   data: [93, 43, 245, 18, 24, 796, 2366],
      //   type: 'bar',
      // },
    ],
  };

  const { setOptions } = useECharts(divRef, 'tdtheme');
  onMounted(() => {
    setOptions(option);
  });
</script>

<style scoped></style>
