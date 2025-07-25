<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search";
import { useStore } from "vuex";

export default defineComponent({
  name: "UserPage",
  components: {
    PageSearch
  },
  setup() {
    const store = useStore();
    store.dispatch("systemModule/getPageListAction", {
      pageUrl: "/user/list",
      queryInfo: {
        size: 10
      }
    });

    return {
      searchFormConfig
    };
  }
});
</script>

<style scoped lang="less"></style>
