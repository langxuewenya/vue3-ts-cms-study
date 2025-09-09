<template>
  <div class="page-list">
    <ListTable
      v-bind="listTableConfig"
      v-model:page="pageInfo"
      :listData="dataList"
      :datasTotalCount="datasTotalCount"
    >
      <template #header-handler>
        <el-button :icon="Refresh" plain @click="handleRefresh">刷新</el-button>
        <el-button :icon="Plus" type="primary" plain @click="handleAdd"
          >新增{{ listTableConfig.title }}</el-button
        >
      </template>
      <template #handler="scope">
        <div>
          <el-button type="primary" link @click="handleEdit(scope)"
            >编辑</el-button
          >
          <el-button type="primary" link @click="handleDelete(scope)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 动态插入其他插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ListTable>
    <AddEditDialog
      ref="addEditDialogRef"
      @addSubmit="addSubmit"
      @editSubmit="editSubmit"
    ></AddEditDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import ListTable from "@/base-ui/list-table";
import AddEditDialog from "@/base-ui/add-edit-dialog";
import { Plus, Refresh } from "@element-plus/icons-vue";
import { formatDateTime } from "@/utils/format";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  name: "PageListPage",
  components: {
    ListTable,
    AddEditDialog
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    listTableConfig: {
      type: Object,
      required: true
    },
    addEditConfig: {
      type: Object
    }
  },
  setup(props) {
    const addEditDialogRef = ref<InstanceType<typeof AddEditDialog>>();

    const store = useStore();

    const pageInfo = ref(props.listTableConfig.pageInfo);
    const queryCache = ref({});

    watch(pageInfo, () => getPageData(queryCache.value));

    const getPageData = (queryInfo: any = {}) => {
      queryCache.value = queryInfo; // 缓存查询条件，以供分页器变化时传入
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          currentPage: pageInfo?.value?.currentPage,
          pageSize: pageInfo?.value?.pageSize,
          ...queryInfo
        }
      });
    };

    const dataList = computed(() =>
      store.getters["systemModule/pageDatas"](props.pageName)
    );
    const datasTotalCount = computed(() =>
      store.getters["systemModule/pageDatasCount"](props.pageName)
    );

    // 动态获取自定义外的其他插槽
    const defaultSlots = ["handler"]; // 已自定义好的插槽
    const otherPropSlots = props.listTableConfig.propList.filter(
      (item: any) => {
        if (defaultSlots.includes(item.slotName)) return false;
        return true;
      }
    );

    // 刷新
    const handleRefresh = () => {
      getPageData(queryCache.value);
    };
    // 新增
    const handleAdd = () => {
      addEditDialogRef.value?.showAdd(
        props.listTableConfig.title,
        props?.addEditConfig
      );
    };
    // 新增提交
    const addSubmit = async (formData: any) => {
      const addRes = await store.dispatch("systemModule/addPageObjAction", {
        pageName: props.pageName,
        queryInfo: {
          ...formData
        }
      });
      addEditDialogRef.value?.loadingChange();
      if (addRes.code == 200) {
        ElMessage.success(`新增${props.listTableConfig.title}成功`);
        addEditDialogRef.value?.close();
        getPageData(queryCache.value);
      }
    };
    // 编辑
    const handleEdit = (scope: any) => {
      addEditDialogRef.value?.showEdit(
        props.listTableConfig.title,
        props?.addEditConfig,
        scope.row
      );
    };
    // 编辑提交
    const editSubmit = async (formData: any) => {
      const editRes = await store.dispatch("systemModule/editPageRowAction", {
        pageName: props.pageName,
        queryInfo: {
          ...formData
        }
      });
      addEditDialogRef.value?.loadingChange();
      if (editRes.code == 200) {
        ElMessage.success(`修改${props.listTableConfig.title}成功`);
        addEditDialogRef.value?.close();
        getPageData(queryCache.value);
      }
    };
    // 删除
    const handleDelete = async (scope: any) => {
      ElMessageBox.confirm(
        `删除后不可恢复，确认删除该${props.listTableConfig.title}？`,
        `删除${props.listTableConfig.title}`,
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const deleteRes = await store.dispatch(
            "systemModule/deletePageRowAction",
            {
              pageName: props.pageName,
              queryInfo: {
                id: scope.row.id
              }
            }
          );
          if (deleteRes.code == 200) {
            ElMessage.success(`删除${props.listTableConfig.title}成功`);
            getPageData(queryCache.value);
          }
        })
        .catch(() => {});
    };

    return {
      dataList,
      datasTotalCount,
      getPageData,
      Plus,
      Refresh,
      formatDateTime,
      pageInfo,
      otherPropSlots,
      handleRefresh,
      handleAdd,
      handleEdit,
      handleDelete,
      addEditDialogRef,
      addSubmit,
      editSubmit
    };
  }
});
</script>

<style scoped>
.page-list {
  margin-top: 20px;
}
</style>
