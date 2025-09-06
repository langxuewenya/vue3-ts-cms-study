<template>
  <div class="select-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :style="itemStyle">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <CustomFormItem
              v-model="formData[`${item.field}`]"
              :itemConfig="item"
            ></CustomFormItem>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "../types";

import CustomFormItem from "@/base-ui/custom-form-item";

export default defineComponent({
  name: "SelectFormPage",
  components: {
    CustomFormItem
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "0 10px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // 屏幕宽度>=1920px，一行显示4个
        lg: 8, // >=1200px，一行显示3个
        md: 12, // >=992px，一行显示2个
        sm: 24, // >=768px，一行显示1个
        xs: 24 // <768px，一行显示1个
      })
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue });

    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      {
        deep: true
      }
    );

    return {
      formData
    };
  }
});
</script>

<style scoped lang="less">
.select-form {
  padding-top: 18px;
  border: 1px solid #bcdcff;
  border-radius: 5px;
  background-color: #ecf5ff;
}
</style>
