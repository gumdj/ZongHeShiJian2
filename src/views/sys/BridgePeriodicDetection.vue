<template>
  <div>
    <el-form inline>
      <el-select
          v-model="displayBridgeId"
          placeholder="请选择桥梁" @change="handleBridgeIdSelectorValueChange">
        <el-option
            :label="item.bridgeName"
            :value="item.bridgeId"
            v-for="(item, index) in bridgeItemList"
            :key="index"></el-option>
      </el-select>
      <el-button
          style="margin-left: 10px; height: 39px"
          type="primary"
          :disabled="displayBridgeId === null"
          @click="drawerVisible = true">新增</el-button>
    </el-form>
    <el-drawer
        title="定期检测项"
        :before-close="handleClose"
        :visible.sync="drawerVisible"
        direction="btt"
        custom-class="demo-drawer"
        :wrapperClosable="false"
        size="100%"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="桥面系" name="1">
            <el-tabs type="border-card">
              <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            </el-tabs>
            <DailyDetectionCard class="input-sheet"></DailyDetectionCard>
          </el-tab-pane>
          <el-tab-pane label="上部结构" name="2"><DailyDetectionCard class="input-sheet"></DailyDetectionCard></el-tab-pane>
          <el-tab-pane label="下部结构桥墩" name="3"><DailyDetectionCard class="input-sheet"></DailyDetectionCard></el-tab-pane>
          <el-tab-pane label="下部结构桥台" name="4"><DailyDetectionCard class="input-sheet"></DailyDetectionCard></el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import DailyDetectionCard from "../inc/bridgeInfoComponents/bridgeCard/DailyDetectionCard";
import {getRequest} from "../../axios";
export default {
  name: "BridgePeriodicDetection",
  components: {DailyDetectionCard},
  data() {
    return {
      bridgeItemList: [],

      drawerVisible: false,

      periodicDetectionConfiguration: {},

      displayBridgeId: null,

      activeName: '1'
    }
  },
  created() {

  },
  methods: {
    handleBridgeIdSelectorValueChange() {

    },
    handleClose() {
      this.drawerVisible = false
    },
    getPeriodicDetectionConfiguration() {
      getRequest('/periodic-detection-conf/' + this.displayBridgeId)
    }
  }
}
</script>

<style scoped>
.input-sheet {
  height: 770px;
  width: 96%;
  margin: 20px 20px 20px 20px;
}
</style>