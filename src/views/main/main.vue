<template>
  <div class="main-page">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '210px'" class="aside">
        <NavMenu :isFold="isFold" />
      </el-aside>
      <el-container class="content">
        <el-header class="header">
          <NavHeader @handleFoldOrExpand="handleFoldOrExpand" />
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";

export default defineComponent({
  name: "MainPage",
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isFold = ref(false);
    const handleFoldOrExpand = (val: boolean) => {
      isFold.value = val;
    };
    return {
      isFold,
      handleFoldOrExpand
    };
  }
});
</script>

<style scoped lang="less">
@bg: #dcedff8a;

.main-page {
  position: fixed;
  width: 100%;
  height: 100%;

  .main-container {
    height: 100%;

    .aside {
      background-color: @bg;
      overflow-x: hidden;
      overflow-y: auto;
      transition: width 0.3s linear;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .content {
      .header {
        height: 48px !important;
        background-color: @bg;
      }

      .main {
        height: calc(100% - 48px);
      }
    }
  }
}
</style>
