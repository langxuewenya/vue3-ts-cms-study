<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    return {
      zhCn
    };
  }
});
</script>

<style lang="less"></style>
