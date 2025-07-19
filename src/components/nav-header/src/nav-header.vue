<template>
  <div class="nav-header">
    <div class="left">
      <el-icon class="expand-fold-icon" @click="foldOrExpand">
        <Expand v-if="isFold" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";

export default defineComponent({
  name: "NavHeaderPage",
  components: {
    Expand,
    Fold
  },
  emits: ["handleFoldOrExpand"],
  setup(props, { emit }) {
    const isFold = ref(false);

    const foldOrExpand = () => {
      isFold.value = !isFold.value;
      emit("handleFoldOrExpand", isFold.value);
    };
    return {
      isFold,
      foldOrExpand
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
    .expand-fold-icon {
      color: @icon-color;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
