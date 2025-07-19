<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isFold" class="title">{{ systemName }}</span>
    </div>
    <el-menu
      default-active="3"
      class="el-menu-vertical"
      :collapse="isFold"
      active-text-color="#005a8d"
      background-color="#dcedff8a"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="getIcon(item.icon)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                <el-icon v-if="subitem.icon">
                  <component :is="getIcon(subitem.icon)" />
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <el-icon v-if="item.icon">
              <component :is="getIcon(item.icon)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import * as Icons from "@element-plus/icons-vue";

export default defineComponent({
  name: "NavMenuPage",
  components: {
    ...Icons
  },
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const systemName = ref(process.env.VUE_APP_SYSTEM_NAME || "管理系统");

    const userMenus = computed(() => {
      //   return store.state.loginModule.userMenus;
      return [
        {
          id: 1,
          url: "/main/home",
          icon: "HomeFilled",
          name: "首页",
          type: 2,
          children: []
        },
        {
          id: 2,
          url: "/main/system",
          icon: "Setting",
          name: "系统管理",
          type: 1,
          children: [
            {
              id: 3,
              url: "/main/system/user-mgr",
              icon: "User",
              name: "用户管理",
              type: 2,
              children: []
            },
            {
              id: 4,
              url: "/main/system/role-mgr",
              icon: "Postcard",
              name: "角色管理",
              type: 2,
              children: []
            }
          ]
        }
      ];
    });

    function getIcon(iconName: string) {
      return Icons[iconName as keyof typeof Icons];
    }

    return {
      systemName,
      userMenus,
      Icons,
      getIcon
    };
  }
});
</script>

<style scoped lang="less">
@title-color: #005a8d;
@hover-bg: #8ec5ffdb;
@active-bg: #c1dfff;

.nav-menu {
  height: 100%;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: @title-color;
    }
  }

  .el-menu {
    border-right: none;
  }

  // hover 高亮
  .el-menu-item:hover,
  :deep(.el-sub-menu__title:hover) {
    color: @title-color;
    background-color: @hover-bg !important;
  }

  .el-menu-item.is-active {
    color: @title-color;
    background-color: @active-bg;
  }
}
</style>
