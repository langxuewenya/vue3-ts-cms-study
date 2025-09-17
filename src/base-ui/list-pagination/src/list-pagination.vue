<template>
  <el-pagination
    v-model:current-page="pageInfo.currentPage"
    v-model:page-size="pageInfo.pageSize"
    :page-sizes="pageInfo.pageSizes"
    :background="pageInfo.background"
    :layout="pageInfo.layout"
    :total="datasTotalCount"
    @current-change="handlePageChange"
    @size-change="handlePageSizeChange"
  />
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  page: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      layout: "total, sizes, prev, pager, next, jumper",
      background: true
    })
  },
  datasTotalCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(["handlePageChange"]);

const pageInfo = ref({ ...props.page }); // page双向绑定

// 当前页改变
const handlePageChange = (currentPage: number) => {
  emit("handlePageChange", currentPage, pageInfo.value.pageSize);
};
// 页面size改变
const handlePageSizeChange = (pageSize: number) => {
  emit("handlePageChange", pageInfo.value.currentPage, pageSize);
};
</script>

<style scoped></style>
