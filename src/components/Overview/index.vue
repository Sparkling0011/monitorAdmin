<template>
  <div class="px-4">
    <Card>
      <template #default>
        <n-date-picker
          v-model:value="value"
          type="daterange"
          size="small"
          clearable
          class="w-1/4"
        />
      </template>
    </Card>

    <Card>
      <template #default><slot name="chart"></slot></template>
    </Card>

    <Card v-if="!!tableInfos?.request">
      <template #header>
        <slot name="tableName"></slot>
      </template>
      <template #default>
        <Table
          :columns="tableInfos?.columns"
          :request="tableInfos?.request"
          :row-key="(row) => row.id"
          :pagination="pagination"
          ref="tableRef"
          @update:checked-row-keys="onCheckedRow"
          :scroll-x="1090"
      /></template>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';

  import Table from '../Table/src/Table.vue';
  import { useProjectStore } from '@/store/modules/project';
  import Card from '../Card/index.vue';

  const props = defineProps<{
    range: number[];
    tableInfos?: {
      columns: any[];
      request: (data: any) => any;
    };
  }>();

  const emits = defineEmits(['update:range']);

  const projectStore = useProjectStore();
  const tableRef = ref();

  const pagination = reactive({
    pageSizes: [1, 5, 10, 20],
    showQuickJumper: false,
    showSizePicker: true,
    prefix({ itemCount }) {
      return `Total is ${itemCount}`;
    },
  });

  const value = computed({
    get() {
      return props.range;
    },
    async set(newValue: any[]) {
      emits('update:range', newValue);
      const [startAt, endAt] = newValue;
      props.tableInfos && tableRef.value.reload({ startAt, endAt, pid: projectStore.pid });
    },
  });

  watch(
    () => projectStore.pid,
    () => {
      const [start_at, end_at] = value.value || [];
      const list = props.tableInfos?.request({ start_at, end_at, pid: projectStore.pid });
      tableRef.value.reload(list);
    }
  );
  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }
</script>
