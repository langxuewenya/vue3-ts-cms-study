import { ref } from "vue";
import PageList from "@/components/page-list";

export function usePageSearch() {
  const pagListRef = ref<InstanceType<typeof PageList>>();

  const handleSearch = (queryInfo: any) => {
    pagListRef.value?.getPageData(queryInfo);
  };
  return { pagListRef, handleSearch };
}
