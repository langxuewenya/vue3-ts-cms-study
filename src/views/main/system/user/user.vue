<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleReset="handleSearch"
      @handleSearch="handleSearch"
    />
    <PageList
      ref="pagListRef"
      :listTableConfig="listTableConfig"
      :addEditConfig="addEditConfig"
      pageName="user"
    >
      <template #cellphone="scope">{{
        "86 - " + (scope.row.cellphone || "")
      }}</template>
      <template #role="scope">{{ roleMap[scope.row.role_id] }}</template>
    </PageList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageList from "@/components/page-list";

import { searchFormConfig } from "./config/search.config";
import { listTableConfig } from "./config/list.config";
import { addEditConfig } from "./config/addedit.config";
import { usePageSearch } from "@/hooks/usePageSearch";

import { roleMap } from "./config/enum";

export default defineComponent({
  name: "UserPage",
  components: {
    PageSearch,
    PageList
  },
  setup() {
    const { pagListRef, handleSearch } = usePageSearch();

    return {
      searchFormConfig,
      listTableConfig,
      addEditConfig,
      handleSearch,
      pagListRef,
      roleMap
    };
  }
});
</script>

<style scoped lang="less"></style>
