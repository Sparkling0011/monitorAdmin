<template>
  <h3><slot name="title">总览</slot></h3>
  <n-layout content-style="padding: 12px;">
    <n-layout-header class="p-4" v-if="showHeader"
      ><n-date-picker v-model:value="value" type="daterange" size="small" clearable class="w-1/3"
    /></n-layout-header>
    <n-divider dashed />
    <n-layout-content> <slot name="chart">chart</slot></n-layout-content>
    <n-divider dashed />
    <slot name="tableName"></slot>
    <n-layout-footer v-if="showFooter">
      <Table
        :columns="columns"
        :request="request"
        :row-key="(row) => row.id"
        ref="actionRef"
        @update:checked-row-keys="onCheckedRow"
        :scroll-x="1090"
      />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import Table from '../Table/src/Table.vue';
  // import { TableAction } from '../Table';
  import { useProjectStore } from '@/store/modules/project';

  const props = defineProps<{
    showHeader: boolean;
    showFooter: boolean;
    columns?: any[];
    range?: number[];
    request?: (data: any) => any;
  }>();
  const emits = defineEmits(['update:range', 'update:request']);

  const projectStore = useProjectStore();
  const actionRef = ref(null);

  const value = computed({
    get() {
      return props.range;
    },
    set(newValue: any[]) {
      const [start_at, end_at] = newValue;
      const list = props.request({ start_at, end_at, pid: projectStore.pid });
      actionRef.value?.reload(list);
      emits('update:range', newValue);
    },
  });

  // :actionColumn="actionColumn"

  // const actionColumn = reactive({
  //   width: 100,
  //   title: '操作',
  //   key: 'action',
  //   fixed: 'right',
  //   render(record) {
  //     return h(TableAction as any, {
  //       style: 'button',
  //       actions: [
  //         {
  //           label: '查看详情',
  //           onClick: handleDetail.bind(null, record),
  //           // 根据业务控制是否显示 isShow 和 auth 是并且关系
  //           ifShow: () => {
  //             return true;
  //           },
  //           // 根据权限控制是否显示: 有权限，会显示，支持多个
  //           auth: ['basic_list'],
  //         },
  //         {
  //           label: '删除',
  //           onClick: handleDelete.bind(null, record),
  //           // 根据业务控制是否显示 isShow 和 auth 是并且关系
  //           ifShow: () => {
  //             return true;
  //           },
  //           // 根据权限控制是否显示: 有权限，会显示，支持多个
  //           auth: ['basic_list'],
  //         },
  //         // {
  //         //   label: '编辑',
  //         //   onClick: handleEdit.bind(null, record),
  //         //   ifShow: () => {
  //         //     return true;
  //         //   },
  //         //   auth: ['basic_list'],
  //         // },
  //       ],
  //       // dropDownActions: [
  //       //   {
  //       //     label: '启用',
  //       //     key: 'enabled',
  //       //     // 根据业务控制是否显示: 非enable状态的不显示启用按钮
  //       //     ifShow: () => {
  //       //       return true;
  //       //     },
  //       //   },
  //       //   {
  //       //     label: '禁用',
  //       //     key: 'disabled',
  //       //     ifShow: () => {
  //       //       return true;
  //       //     },
  //       //   },
  //       // ],
  //       select: (key) => {
  //         window['$message'].info(`您点击了，${key} 按钮`);
  //       },
  //     });
  //   },
  // });

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }
</script>
