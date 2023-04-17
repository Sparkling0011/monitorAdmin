<template>
  <div class="view-account">
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.logo" alt="" />
          <div class="title text-4xl font-bold text-center grow">{{ websiteConfig.title }}</div>
        </div>
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <div class="view-account-form">
        <Login v-if="isLogin" />
        <Register @update-login="handleRegisterSuccess" v-else />
        <a class="block mt-3" @click="isLogin = !isLogin">{{ isLogin ? '注册' : '返回登录' }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { websiteConfig } from '@/config/website.config';
  import Login from './login.vue';
  import Register from './register.vue';
  const isLogin = ref(true);

  const handleRegisterSuccess = (isSuccess: boolean) => {
    isLogin.value = isSuccess;
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-logo {
        display: flex;
        height: 50px;
      }
      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }
    &-form {
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
