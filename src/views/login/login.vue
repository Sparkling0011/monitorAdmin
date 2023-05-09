<template>
  <n-form ref="formRef" :model="loginForm" :rules="rules">
    <n-form-item label="用户名/邮箱" path="auth">
      <n-input v-model:value="loginForm.auth" placeholder="请输入用户名或邮箱">
        <template #prefix>
          <n-icon size="18" color="#808695">
            <PersonOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input
        v-model:value="loginForm.password"
        type="password"
        showPasswordOn="click"
        placeholder="请输入密码"
      >
        <template #prefix>
          <n-icon size="18" color="#808695">
            <LockClosedOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>

    <div class="flex justify-between mt-3">
      <div class="flex-initial">
        <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
      </div>
      <div class="flex-initial order-last">
        <a href="javascript:">忘记密码</a>
      </div>
    </div>
    <n-button class="mt-3" type="primary" @click="handleLogin" :loading="loading" block>
      登录
    </n-button>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
  import { PageEnum } from '@/enums/pageEnum';
  import { useProjectStore } from '@/store/modules/project';

  interface FormState {
    auth: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const userStore = useUserStore();
  const projectStore = useProjectStore();

  const router = useRouter();
  const route = useRoute();

  const loginForm = reactive({
    auth: '',
    password: '',
    isCaptcha: true,
  });

  const rules = {
    auth: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };
  const handleLogin = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { auth, password } = loginForm;
        message.loading('登录中...');
        loading.value = true;

        const params: FormState = {
          auth,
          password,
        };

        try {
          const { code, message: msg } = await userStore.login(params);
          message.destroyAll();
          if (code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success('登录成功，即将进入系统');
            if (route.name === LOGIN_NAME) {
              router.replace('/');
            } else router.replace(toPath);
            projectStore.updateProjectID(projectStore.projectList[0].pid);
          } else {
            message.info(msg || '登录失败');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };
</script>
