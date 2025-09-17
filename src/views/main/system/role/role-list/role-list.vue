<template>
  <div>
    <PageList
      ref="pagListRef"
      :listTableConfig="roleListTableConfig"
      :addEditConfig="addEditConfig"
      pageName="role"
    ></PageList>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import PageList from "@/components/page-list";
import { roleListTableConfig } from "./config/list.config";
import { addEditConfig } from "./config/addedit.config";

const pagListRef = ref<InstanceType<typeof PageList>>();

onMounted(() => {
  pagListRef.value?.getPageData();
});
</script>

<style scoped></style>
