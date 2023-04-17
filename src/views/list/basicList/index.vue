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
  // import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { useRouter } from 'vue-router';
  import { storage } from '@/utils/Storage';
  import { useProjectStore } from '@/store/modules/project';

  const schemas: FormSchema[] = [
    {
      field: 'pid',
      // labelMessage: '这是一个提示',
      component: 'NInput',
      label: '项目ID',
      componentProps: {
        placeholder: '请输入项目ID',
        // onInput: (e: any) => {
        //   // console.log(e);
        // },
      },
      // rules: [{ required: true, message: '请输入项目ID', trigger: ['blur'] }],
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
      field: 'log_at',
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

  const router = useRouter();
  const projectStore = useProjectStore();
  // const message = useMessage();
  const actionRef = ref();
  // const formParams = reactive({
  //   name: '',
  //   address: '',
  //   date: null,
  // });

  const params = ref({
    pageSize: 1,
    uid: storage.get('CURRENT-USER')._id,
  });

  const actionColumn = reactive({
    width: 100,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '查看详情',
            onClick: handleDetail.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['basic_list'],
          },
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['basic_list'],
          },
          // {
          //   label: '编辑',
          //   onClick: handleEdit.bind(null, record),
          //   ifShow: () => {
          //     return true;
          //   },
          //   auth: ['basic_list'],
          // },
        ],
        // dropDownActions: [
        //   {
        //     label: '启用',
        //     key: 'enabled',
        //     // 根据业务控制是否显示: 非enable状态的不显示启用按钮
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        //   {
        //     label: '禁用',
        //     key: 'disabled',
        //     ifShow: () => {
        //       return true;
        //     },
        //   },
        // ],
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
    const a = {
      _id: '6436a29fc84098df4637464d',
      pid: '7b4c872d-bef3-443a-b69c-b433cbbb15b0',
      pname: 'monitor',
      uid: '64361b2730c421dc4f15e9f9',
      createAt: '2023-04-12T12:22:46.994Z',
      __v: 0,
    };

    // console.log({ ...formParams, ...params.value, ...res });
    // const { projects } = ;

    return await getTableList({ ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable(values) {
    actionRef.value.reload(values);
  }

  // function handleEdit(record: Recordable) {
  //   console.log('点击了编辑', record);
  //   router.push({ name: 'basic-info', params: { id: record.id } });
  // }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    window['$message'].info('点击了删除');
  }

  async function handleDetail(record: Recordable) {
    console.log('点击了查看', record);
    await projectStore.updateProjectID(record.pid);
    router.replace('/js/overview');
  }

  function handleSubmit(values: Recordable) {
    reloadTable(values);
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped></style>
