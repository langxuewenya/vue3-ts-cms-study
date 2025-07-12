<template>
  <div class="login">
    <div class="left">
      <div class="system-title">{{ systemTitle }}管理系统</div>
      <div class="image">
        <img class="login-img" src="@/assets/img/login.jpg" />
      </div>
    </div>
    <div class="right">
      <loginAccount></loginAccount>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginAccount from "./login-account.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    loginAccount
  },
  setup() {
    const systemTitle = ref("XX后台");

    return { systemTitle };
  }
});
</script>

<style lang="less" scoped>
@bg: #dcedff;
// @bg: #e1ede1;
@system_title: #6a645c;

.login {
  height: 100vh;
  display: flex;
  background-color: @bg;
  .left,
  .right {
    height: 100%;
  }
  .left {
    width: 45%;
    border-right: 2px solid #e2e2e2;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .system-title {
      font-size: clamp(1.8rem, 3.2vw, 3.8rem);
      font-weight: 600;
      color: @system_title;
      align-items: center;
      margin-bottom: 8%;
    }
    .image {
      text-align: center;
      height: 60%;
      .login-img {
        width: 95%;
        height: 95%;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
