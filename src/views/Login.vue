<template>
  <div>
    <el-form :model="loginForm"
             :rules="rules" ref="loginForm"
             class="demo-loginForm login-container"
             label-position="left"
             status-icon>
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input label="" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input label="" placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="submitLogin">登录</el-button>
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
      //表单项及规则
      loginForm: {
        username: 'admin',
        password: 'admin'
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
      this.loginForm.password = null
    },
    submitLogin(formName) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          postRequest('/user/login', this.loginForm).then(res => {
            if (res) {
              this.$store.commit('SET_TOKEN', res.obj.tokenHead + res.obj.token)
              router.replace('/')
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
.demo-loginForm {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 250px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>