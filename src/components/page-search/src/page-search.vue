<template>
  <div class="page-search">
    <SelectForm v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="button">
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </SelectForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SelectForm from "@/base-ui/select-form";
import { Refresh, Search } from "@element-plus/icons-vue";
import { formatDateTime } from "@/utils/format";

export default defineComponent({
  name: "PageSearch",
  components: {
    SelectForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ["handleReset", "handleSearch"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems || [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = item?.defaultValue || "";
    }
    const formData = ref(formOriginData);

    // 重置
    const handleReset = () => {
      for (const item in formOriginData) {
        formData.value[item] = formOriginData[item];
      }
      emit("handleReset", formData.value);
    };

    // 搜索
    const handleSearch = () =>
      emit("handleSearch", {
        ...formData.value,
        createTime:
          formData.value.createTime.length > 1
            ? [
                formatDateTime(
                  formData.value.createTime[0],
                  "YYYY-MM-DD 00:00:00"
                ),
                formatDateTime(
                  formData.value.createTime[1],
                  "YYYY-MM-DD 23:23:59"
                )
              ]
            : formData.value.createTime
      });

    return {
      formData,
      Refresh,
      Search,
      handleReset,
      handleSearch
    };
  },
  // 页面首次加载触发搜索事件
  mounted() {
    this.handleSearch();
  }
});
</script>

<style scoped lang="less">
.page-search {
  .button {
    display: flex;
    justify-content: flex-end;
    margin: 0 50px 15px 0;
  }
}
</style>
