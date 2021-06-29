<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-submenu :index="menu.name" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>
      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name">
          <template slot="title">
            <i :class="item.icon" style="margin-right: 10px"></i>
            <span slot="title">{{item.title}}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  computed: {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      }
    }
  }
}
</script>

<style>
.el-menu-vertical-demo {
  height: 100vh;
  text-align: left;
}
.el-menu-item {
  height: 60px !important;
}
.el-submenu__title {
  height: 60px !important;
}
.router-link-active {
  text-decoration: none;
  color: yellow;
}
a {
  text-decoration: none;
  color: white;
}
</style>