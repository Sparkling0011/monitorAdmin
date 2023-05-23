<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :pagination="pagination"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { columns } from './columns';
  import { deleteProject } from '@/api/project/project';
  import { useProjectStore } from '@/store/modules/project';
  import { useMessage } from 'naive-ui';

  const schemas: FormSchema[] = [
    {
      field: 'pid',
      component: 'NInput',
      label: '项目ID',
      componentProps: {
        placeholder: '请输入项目ID',
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'pname',
      component: 'NInput',
      label: '项目名称',
      componentProps: {
        placeholder: '请输入项目名称',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'range',
      component: 'NDatePicker',
      label: '创建时间',
      componentProps: {
        placeholder: '请输入日期',
        showButton: false,
        type: 'daterange',
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const pagination = reactive({
    pageSizes: [1, 5, 10, 20],
    showQuickJumper: false,
    showSizePicker: true,
    prefix({ itemCount }) {
      return `Total is ${itemCount}`;
    },
  });

  const message = useMessage();
  const projectStore = useProjectStore();
  const actionRef = ref();

  const params = {
    // pageSize: 1,
  };

  const actionColumn = reactive({
    width: 100,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            // auth: ['basic_list'],
          },
          {
            label: '查看详情',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            // auth: ['basic_list'],
          },
        ],
        select: (key) => {
          window['$message'].info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const loadDataTable = async (res) => {
    return await projectStore.getProjectList({ ...res, ...params });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable(values) {
    actionRef.value.reload(values);
  }

  async function handleDelete(record: Recordable) {
    const { message: msg, success } = await deleteProject(record.pid);
    success ? message.success(msg) : message.error(msg);
    reloadTable({});
  }

  function handleSubmit(values: Recordable) {
    reloadTable(values);
  }

  function handleReset() {
    reloadTable({});
  }
</script>

<style lang="less" scoped></style>
