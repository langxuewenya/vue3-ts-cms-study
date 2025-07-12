<template>
  <div>
    <el-form ref="formRef" :model="account" :rules="rules" class="login-form">
      <el-form-item>
        <div class="single-line">
          <div class="login-text">登录</div>
          <!-- <span>没有账号？<span class="blue underline">点此注册</span></span> -->
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="account.username"
          type="text"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="account.password"
          size="large"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="single-line">
          <el-checkbox v-model="rememberPassword" class="remember-password"
            >记住密码</el-checkbox
          >
          <!-- <span class="underline">短信验证登录</span> -->
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          plain
          class="login-btn"
          @click="handleLoginClick"
          >登录</el-button
        >
      </el-form-item>
      <!-- <div class="forget-pwd underline">忘记密码？</div> -->
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ElForm } from "element-plus";

import { rules } from "./config";

export default defineComponent({
  name: "LoginAccountPage",
  setup() {
    const rememberPassword = ref(true);
    const account = reactive({
      username: "",
      password: ""
    });
    const formRef = ref<InstanceType<typeof ElForm>>();

    const handleLoginClick = () => {
      // 登录逻辑
      formRef.value?.validate((valid) => {
        if (!valid) {
          console.log("表单验证失败");
          return;
        }
      });
      console.log("登录信息：", account);
    };

    return { rememberPassword, account, rules, handleLoginClick, formRef };
  }
});
</script>

<style lang="less" scoped>
@input_width: 400px;
@input_height: 50px;
@system_title: #6a645c;
@blue_font: #409eff;

.login-form {
  width: @input_width;
  .el-input {
    height: @input_height;
  }
  .iconfont {
    font-size: 20px;
    margin-right: 5px;
    line-height: @input_height;
  }
  .iconfont:hover {
    cursor: pointer;
    color: #515151;
  }
  .single-line {
    width: 100%;
    line-height: @input_height;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: @system_title;
    .login-text {
      font-size: clamp(1.8rem, 2.4vw, 2.6rem);
      font-weight: 600;
    }
    .remember-password {
      height: @input_height;
    }
  }
  .forget-pwd {
    text-align: center;
    font-size: 15px;
    color: @system_title;
  }
  .login-btn {
    width: @input_width;
    height: @input_height;
    font-size: 20px;
    font-weight: 600;
  }
}
.blue {
  color: @blue_font;
}
.underline:hover {
  color: @blue_font;
  cursor: pointer;
  text-decoration: underline;
}
</style>
