<template>
  <div>
    <el-form-item :label="item.label" :rules="item.rules" :prop="item.field">
      <!-- input -->
      <template v-if="item.type === 'input'">
        <el-input
          v-model="value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
        />
      </template>
      <!-- select -->
      <template v-else-if="item.type === 'select'">
        <el-select
          v-model="value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
        >
          <el-option
            v-for="opt in item.options"
            :value="opt.value"
            :key="opt.value"
            :label="opt.label"
          ></el-option>
        </el-select>
      </template>
      <!-- datepicker -->
      <template v-else-if="item.type === 'datepicker'">
        <el-date-picker v-bind="item.otherOptions" v-model="value" />
      </template>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { IFormItem } from "../types";

const props = defineProps<{
  modelValue: any;
  itemConfig: IFormItem;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);
const item = ref({ ...props.itemConfig });

watch(
  value,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

// 监听父组件v-model值的变化，并赋给当前组件最新值
watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
  }
);

watch(
  () => props.itemConfig,
  (newVal) => {
    item.value = { ...newVal };
  },
  { deep: true }
);
</script>

<style scoped></style>
