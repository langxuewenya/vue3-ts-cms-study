<template>
  <div class="list-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}列表</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      v-bind="treePropsConfig"
      border
      max-height="500px"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              <!-- 枚举类型 -->
              <template v-if="item.isEnum">
                {{ item?.optionMap?.[scope.row[item.prop || ""]] }}
              </template>
              <!-- 非枚举类型 -->
              <template v-else>
                {{ scope.row[item.prop || ""] }}
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <ListPagination
          v-bind="page"
          :datasTotalCount="datasTotalCount"
          @handlePageChange="handlePageChange"
        ></ListPagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ListPagination from "@/base-ui/list-pagination";
import { IPropsList } from "../types/index";

export default defineComponent({
  name: "ListTablePage",
  components: {
    ListPagination
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    listData: {
      type: Array,
      default: () => []
    },
    datasTotalCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<IPropsList[]>,
      default: () => []
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    // 是否显示分页器
    showFooter: {
      type: Boolean,
      default: true
    },
    // 渲染树形数据的配置
    treePropsConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    // 当前页/页面size改变
    const handlePageChange = (currentPage: number, pageSize: number) => {
      emit("update:page", { currentPage, pageSize });
    };

    // 选中行数据变化事件
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };
    return {
      handlePageChange,
      handleSelectionChange
    };
  }
});
</script>

<style scoped lang="less">
.list-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;

    .title {
      font-size: 15px;
      font-weight: 500;
      color: @theme-color;
    }
  }
  // 设置树形一级节点样式
  ::v-deep .el-table .tree-first-level-row {
    background-color: #ecf5ff !important;
  }
  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
