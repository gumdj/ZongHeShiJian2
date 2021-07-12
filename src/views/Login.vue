<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="">
    </div>
    <el-form :model="loginForm"
             :rules="rules" ref="loginForm"
             class="demo-loginForm login-container"
             label-position="left"
             status-icon>
      <h2 class="title">Login</h2>
      <el-form-item prop="username">
        <el-input class="input-box" clearable label="" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="input-box" clearable label="" placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button"  type="primary" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getRequest, postRequest} from "../axios";
import router from "../router";

export default {
  name: "Login",
  data() {
    return {
      imgSrc: require('../assets/loginBackgroundImage/wallhaven-4od535_1920x1080.png'),

      //表单项及规则
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'background-color:#3c3645')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    reSetForm() {
      this.loginForm.password = ''
    },
    submitLogin(formName) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          postRequest('/user/login', this.loginForm).then(res => {
            if (res) {
              this.$store.commit('SET_TOKEN', res.obj.tokenHead + res.obj.token)
              this.$store.commit('SET_USERNAME', this.loginForm.username)
              router.replace('/index')
            }
          })
        }
        this.reSetForm()
      })
    }
  }
}
</script>

<style scoped>
.background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-box {
  width: 250px;
}
.title {
  font-family: "Source Code Pro";
  font-size: 35px;
}
.login-button {
  width: 120px;
}
.demo-loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-border-radius: 5px;
  flex-direction: column;
  border-radius: 5px;
  width: 420px;
  height: 300px;
  padding: 0;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>