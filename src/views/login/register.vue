<template>
  <n-form ref="formRef" :model="registerForm" :rules="rules">
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="registerForm.username" placeholder="请输入用户名">
        <template #prefix>
          <n-icon size="16" color="#808695">
            <PersonOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="registerForm.email" placeholder="请输入邮箱">
        <template #prefix>
          <n-icon size="18" color="#808695">
            <MailOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input
        v-model:value="registerForm.password"
        type="password"
        @input="handlePasswordInput"
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
    <n-form-item ref="cPasswordFormItemRef" label="确认密码" path="confirmPassword">
      <n-input
        v-model:value="registerForm.confirmPassword"
        type="password"
        showPasswordOn="click"
        placeholder="请再次确认密码"
      >
        <template #prefix>
          <n-icon size="18" color="#808695">
            <LockClosedOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-button type="primary" @click="handleRegister" block>注册</n-button>
  </n-form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { PersonOutline, LockClosedOutline, MailOutline } from '@vicons/ionicons5';
  import { FormInst, FormItemInst, FormItemRule, FormRules, useMessage } from 'naive-ui';
  import { useUserStore } from '@/store/modules/user';
  import { ResultEnum } from '@/enums/httpEnum';

  const emits = defineEmits(['updateLogin']);

  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const formRef = ref<FormInst | null>(null);
  const cPasswordFormItemRef = ref<FormItemInst | null>(null);
  const message = useMessage();
  const userStore = useUserStore();
  const loading = ref(false);

  const validatePasswordStartWith = (_rule: FormItemRule, value: string): boolean => {
    return (
      !!registerForm.password &&
      registerForm.password.startsWith(value) &&
      registerForm.password.length >= value.length
    );
  };
  const validatePasswordSame = (_rule: FormItemRule, value: string) => {
    return value === registerForm.password;
  };

  const rules: FormRules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    email: { required: true, message: '请输入邮箱', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
    confirmPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: ['input', 'blur'],
      },
      {
        validator: validatePasswordStartWith,
        message: '两次密码输入不一致',
        trigger: 'input',
      },
      {
        validator: validatePasswordSame,
        message: '两次密码输入不一致',
        trigger: ['blur', 'password-input'],
      },
    ],
  };

  const handlePasswordInput = () => {
    if (registerForm.confirmPassword) {
      cPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();

    formRef.value?.validate(async (errors) => {
      if (!errors) {
        message.loading('注册中...');
        loading.value = true;

        try {
          const { code, message: msg } = await userStore.register(registerForm);
          message.destroyAll();
          if (code === ResultEnum.SUCCESS) {
            emits('updateLogin', true);
            message.success(msg || '登录成功');
          } else {
            message.info(msg || '登录失败');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写注册相关信息');
      }
    });
  };
</script>
