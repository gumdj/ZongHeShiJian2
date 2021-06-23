<template>
  <div>
    <el-form :model="editForm"
             :rules="rules" ref="editForm"
             class="demo-editForm login-container"
             label-position="left"
             status-icon>
      <h3 class="title">系统登录</h3>
      <el-form-item prop="name">
        <el-input label="" placeholder="请输入用户名" v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input label="" placeholder="请输入密码" type="password" v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //表单项及规则
      editForm: {
        userName: null,
        password: null
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  beforeCreate(){
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:#3c3645')
  },
  methods: {

  }
}
</script>

<style scoped>
.demo-editForm {
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