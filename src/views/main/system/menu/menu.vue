<template>
  <div class="menu">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleReset="handleSearch"
      @handleSearch="handleSearch"
    />
    <PageList
      ref="pagListRef"
      :listTableConfig="listTableConfig"
      pageName="menu"
    ></PageList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageList from "@/components/page-list";

import { searchFormConfig } from "./config/search.config";
import { listTableConfig } from "./config/list.config";
import { usePageSearch } from "@/hooks/usePageSearch";

export default defineComponent({
  name: " MenuPage",
  components: {
    PageSearch,
    PageList
  },
  setup() {
    const { pagListRef, handleSearch } = usePageSearch();

    return {
      searchFormConfig,
      listTableConfig,
      handleSearch,
      pagListRef
    };
  }
});
</script>

<style scoped></style>
