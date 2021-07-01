<template>
  <div>
    <el-container>
      <el-aside width="201px">
        <SideMenu></SideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <strong style="margin-left: 100px">桥梁养护信息管理平台</strong>
          <div class="header-avatar" style="margin-left: 60px">
            <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown style="margin-right: 30px" placement="top-start">
              <span class="el-dropdown-link">
                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin: 0; padding: 0;">
                <el-dropdown-item @click.native="centerDialogVisible = true">
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <div style="margin: 0 10px;">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
        :title="userInfo.username"
        :visible.sync="centerDialogVisible"
        width="376px"
        :show-close="false"
        center>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <el-avatar style="width: 100px; height: 100px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <span class="key">用户名: </span>
            <span class="value">{{userInfo.username}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <span class="key">性别: </span>
            <span class="value">{{userInfo.gender}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <span class="key">联系方式: </span>
            <span class="value">{{userInfo.tel}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <span class="key">权限: </span>
            <span class="value"
                  v-if="userInfo.type === 0"
                  style="border-radius: 4px;background-color: mediumblue;color: #FFFFFF;font-weight: bold">&nbsp;管理员&nbsp;
            </span>
            <span class="value"
                  v-if="userInfo.type === 1"
                  style="border-radius: 4px;background-color: cornflowerblue;color: #FFFFFF;font-weight: bold">&nbsp;桥梁管理员&nbsp;
            </span>
            <span class="value"
                  v-if="userInfo.type === 2"
                  style="border-radius: 4px;background-color: greenyellow;color: #FFFFFF;font-weight: bold">&nbsp;日常监测员&nbsp;
            </span>
            <span class="value"
                  v-if="userInfo.type === 3"
                  style="border-radius: 4px;background-color: greenyellow;color: #FFFFFF;font-weight: bold">&nbsp;定期监测员&nbsp;
            </span>
            <span class="value"
                  v-if="userInfo.type === 4"
                  style="border-radius: 4px;background-color: red;color: #FFFFFF;font-weight: bold">&nbsp;封禁&nbsp;
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><br/></el-col>
        <el-col :span="16">
          <div class="gap">
            <span class="key">地址: </span>
            <span class="value">{{userInfo.address}}</span>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import SideMenu from "./inc/SideMenu";
import {getRequest, postRequest} from "../axios";
export default {
  name: 'Home',
  data() {
    return {
      centerDialogVisible: false,
      userInfo : {
        "accountNonExpired": true,
        "accountNonLocked": true,
        "address": "",
        "authorities": [
          {
            "authority": ""
          }
        ],
        "credentialsNonExpired": true,
        "enabled": true,
        "gender": "",
        "password": "",
        "tel": "",
        "type": 4,
        "userId": 0,
        "username": ""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getRequest('/user/info', localStorage.getItem('username')).then(res => {
        this.userInfo = res
    })
    },
    logout() {
      postRequest('/user/logout').then(res => {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("resetState")
        this.$router.push("/login")
      })
    }
  },
  components: {SideMenu},
}
</script>

<style>
.value {
  margin-left: 10px;
}
.key {
  font-weight: 700;
}
.gap {
  margin-top: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #FFFFFF;
}
.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}
.el-header {
  background-color: #545C64;
  color: #FFF;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}
.el-main {
  color: #333;
  line-height: 160px;
  padding: 0 !important;
  line-height: 20px !important;
}
</style>
