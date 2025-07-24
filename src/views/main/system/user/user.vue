<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search";

export default defineComponent({
  name: "UserPage",
  components: {
    PageSearch
  },
  setup() {
    return {
      searchFormConfig
    };
  }
});
</script>

<style scoped lang="less"></style>
