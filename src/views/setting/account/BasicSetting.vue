<template>
  <n-grid cols="6">
    <n-grid-item span="4">
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="昵称" path="username">
          <n-input v-model:value="formValue.username" placeholder="请输入昵称" />
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-grid-item>
    <n-grid-item span="2">
      <div class="avatar-uploader flex flex-col items-center justify-center">
        <n-avatar
          class="ml-4"
          :size="54"
          round
          :src="avatorURL"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          @click="handleUpload"
        />
        <input class="uploader" type="file" ref="uploader" />
        <p class="font-bold">点击头像上传</p>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { useUserStoreWidthOut } from '@/store/modules/user';
  import { updateUserInfo } from '@/api/system/user';

  const rules = {
    username: {
      required: true,
      message: '昵称长度必须在5-10之间',
      max: 10,
      min: 5,
    },
  };
  const formRef: any = ref(null);
  const message = useMessage();
  const uploader = ref(null);
  const handleUpload = () => {
    uploader.value?.click();
  };

  const userStore = useUserStoreWidthOut();

  const formValue = reactive({
    username: userStore.info.username,
  });
  const avatorURL = ref(userStore.info.avatar);

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        await updateUserInfo(formValue);
        message.success('更新成功');
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }
</script>

<style scoped>
  .avatar-uploader {
    position: relative;
  }
  .uploader {
    display: none;
  }
</style>
