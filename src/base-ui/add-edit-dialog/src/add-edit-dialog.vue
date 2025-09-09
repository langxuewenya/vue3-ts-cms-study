<template>
  <div>
    <el-dialog
      v-model="showDialog"
      :title="dialogTitle"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="formLabelWidth"
      >
        <template v-for="item in formItems" :key="item.field">
          <CustomFormItem
            v-if="!item.hide"
            v-model="formData[`${item.field}`]"
            :itemConfig="item"
          ></CustomFormItem>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineExpose, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import CustomFormItem from "@/base-ui/custom-form-item";

const emit = defineEmits(["addSubmit", "editSubmit"]);

const showDialog = ref(false);
const loading = ref(false);
const type = ref("add"); // 对话类型：新增/编辑
const formRef = ref<FormInstance>(); // 表单实例
const dialogTitle = ref(""); // 弹窗标题
const dialogWidth = ref(""); // 弹窗宽度
const formData = ref<any>({}); // 表单值
const formItems = ref<Array<any>>([]); // 表单项
const rules = ref<FormRules>({}); // 表单验证规则
const formLabelWidth = ref(""); // 表单标签宽度

// 动态监听字段，监听函数逻辑在addedit.config.js的formItems中配置
const multipleWatch = (item: any) => {
  watch(
    () => formData.value[item.field],
    (newVal) => item.watch(newVal, formItems.value)
  );
};
// 显示
const show = (addEditConfig: any): void => {
  showDialog.value = true;
  dialogWidth.value = addEditConfig?.dialogWidth || "500px";
  formLabelWidth.value = addEditConfig?.formLabelWidth || "100px";
  formItems.value = addEditConfig.formItems;
  rules.value = addEditConfig.formRules;
};
// 新增
const showAdd = (title: string, addEditConfig: any) => {
  dialogTitle.value = `新增${title}`;
  type.value = "add";
  show(addEditConfig);
  for (const item of addEditConfig.formItems) {
    formData.value[item.field] = item?.defaultValue || "";
    item.watch ? multipleWatch(item) : null; // 设置监听
  }
};
// 编辑
const showEdit = (title: any, addEditConfig: any, row: any) => {
  dialogTitle.value = `编辑${title}`;
  type.value = "edit";
  show(addEditConfig);
  // 回显
  for (const item of addEditConfig.formItems) {
    formData.value[item.field] = row[item.field];
    item.watch ? multipleWatch(item) : null; // 设置监听
  }
};
// 关闭
const close = () => {
  formRef.value?.resetFields();
  showDialog.value = false;
};
// 取消
const handleCancel = () => {
  close();
};
// loading状态改变
const loadingChange = () => {
  loading.value = !loading.value;
};
// 提交
const handleSubmit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      loadingChange();
      if (type.value == "add") {
        emit("addSubmit", formData.value);
      } else if (type.value == "edit") {
        emit("editSubmit", formData.value);
      }
    } else {
      console.log("校验失败");
    }
  });
};

defineExpose({
  showAdd,
  showEdit,
  close,
  loadingChange
});
</script>

<style scoped></style>
