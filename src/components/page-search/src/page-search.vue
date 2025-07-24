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
  setup(props) {
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
      // 接口逻辑（待实现）
    };

    // 搜索
    const handleSearch = () => {
      // 搜索逻辑（待实现）
    };

    return {
      formData,
      Refresh,
      Search,
      handleReset,
      handleSearch
    };
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
