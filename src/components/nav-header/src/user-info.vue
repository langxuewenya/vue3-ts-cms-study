<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="user-name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          <el-dropdown-item divided>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import { ElMessageBox } from "element-plus";

export default defineComponent({
  name: "UserInfoPage",
  setup() {
    const store = useStore();
    const name = computed(() => store.state.loginModule.userInfo.name);

    const handleLogout = () => {
      ElMessageBox.confirm("确定要退出登录?", "退出登录", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          store.dispatch("loginModule/logoutAction");
        })
        .catch(() => {});
    };

    return {
      name,
      handleLogout
    };
  }
});
</script>

<style scoped lang="less">
.user-info {
  .user-name {
    margin-left: 5px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link:focus-visible {
  outline: none;
}
</style>
