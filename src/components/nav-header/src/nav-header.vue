<template>
  <div class="nav-header">
    <div class="left">
      <el-icon class="expand-fold-icon" @click="foldOrExpand">
        <Expand v-if="isFold" />
        <Fold v-else />
      </el-icon>
      <div class="router">
        <Breadcrumb :breadcrumbs="breadcrumb" />
      </div>
    </div>
    <div class="right">
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import UserInfo from "./user-info.vue";
import Breadcrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavHeaderPage",
  components: {
    Expand,
    Fold,
    Breadcrumb,
    UserInfo
  },
  emits: ["handleFoldOrExpand"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const foldOrExpand = () => {
      isFold.value = !isFold.value;
      emit("handleFoldOrExpand", isFold.value);
    };

    const store = useStore();
    const route = useRoute();
    const breadcrumb = computed(() => {
      const userMenus = store.state.loginModule.userMenus;
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      isFold,
      foldOrExpand,
      breadcrumb
    };
  }
});
</script>

<style scoped lang="less">
@icon-color: #3f7fac;

.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    align-items: center;
    display: flex;

    .expand-fold-icon {
      color: @icon-color;
      font-size: 24px;
      cursor: pointer;
    }

    .router {
      padding-left: 10px;
    }
  }
}
</style>
