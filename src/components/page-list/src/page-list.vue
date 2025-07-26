<template>
  <div class="page-list">
    <ListTable
      v-bind="listTableConfig"
      v-model:page="pageInfo"
      :listData="dataList"
      :datasTotalCount="datasTotalCount"
    >
      <template #header-handler>
        <el-button :icon="Refresh" plain>刷新</el-button>
        <el-button :icon="Plus" type="primary" plain>新建用户</el-button>
      </template>
      <template #createTime="scope">
        {{ formatDateTime(scope?.row?.createTime, "YYYY-MM-DD") }}
      </template>
      <template #handler>
        <div>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="primary" link>删除</el-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import ListTable from "@/base-ui/list-table";
import { Plus, Refresh } from "@element-plus/icons-vue";
import { formatDateTime } from "@/utils/format";

export default defineComponent({
  name: "PageListPage",
  components: {
    ListTable
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    listTableConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    const queryCache = ref({});

    watch(pageInfo, () => getPageData(queryCache.value));

    const getPageData = (queryInfo: any = {}) => {
      queryCache.value = queryInfo; // 缓存查询条件，以供分页器变化时传入
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          currenrPage: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
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
    const defaultSlots = ["createTime", "handler"]; // 已自定义好的插槽
    const otherPropSlots = props.listTableConfig.propList.filter(
      (item: any) => {
        if (defaultSlots.includes(item.slotName)) return false;
        return true;
      }
    );

    return {
      dataList,
      datasTotalCount,
      getPageData,
      Plus,
      Refresh,
      formatDateTime,
      pageInfo,
      otherPropSlots
    };
  }
});
</script>

<style scoped>
.page-list {
  margin-top: 20px;
}
</style>
