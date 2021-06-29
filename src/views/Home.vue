<template>
  <div>
    <el-container>
      <el-aside width="201px">
        <SideMenu></SideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <strong>桥梁养护信息管理平台</strong>
        </el-header>
        <el-main>
          <div style="margin: 0 10px;">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import SideMenu from "./inc/SideMenu";
export default {
  name: 'Home',
  components: {SideMenu},
}
</script>

<style>
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
