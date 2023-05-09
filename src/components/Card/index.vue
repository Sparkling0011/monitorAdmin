<template>
  <n-card class="mt-4 shadow-md rounded-none">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </n-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
