<template>
  <div>
    <Overview
      :request="loadDataTable"
      :columns="columns"
      v-model:range="range"
      @update:range="handleRangeChange"
    >
      <template #title> JS总览</template></Overview
    >
  </div>
</template>

<script setup lang="ts">
  import { getErrorDistribution } from '@/api/error';
  import Overview from '@/components/Overview/index.vue';
  import { ref } from 'vue';
  const columns = [
    {
      title: '时间',
      key: 'pid',
      width: 150,
    },
    {
      title: '错误名称',
      key: 'error_name',
      width: 100,
    },
    {
      title: 'URL',
      key: 'createAt',
      width: 100,
    },
    {
      title: '状态码',
      key: 'http_code,',
      width: 100,
    },
  ];
  const range = ref<[number, number]>([1681558250950, Date.now()]);
  const handleRangeChange = (value) => {
    console.log(value);
  };

  const params = ref({
    pageSize: 5,
  });

  const loadDataTable = async (res) => {
    return await getErrorDistribution({ ...params.value, ...res });
  };
</script>

<style scoped></style>
