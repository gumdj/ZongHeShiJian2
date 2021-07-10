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
        v-loading="configurationLoading"
        custom-class="demo-drawer"
        :wrapperClosable="false"
        size="100%"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="">
          <el-tab-pane label="桥面系" name="1">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.bridgeDeckComponentName"
                  v-for="(detectDetail, index) in periodicDetectionConfiguration.bridgeDeckDetectionVos"
                  :key="index">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet"></DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="上部结构" name="2">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.topStructureComponentName"
                  v-for="(detectDetail, index) in periodicDetectionConfiguration.topStructureDetectionVos"
                  :key="index">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet"></DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="下部结构桥墩" name="3">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.bottomStructureComponentName"
                  v-for="(detectDetail, index) in periodicDetectionConfiguration.bottomStructurePierDetectionVos"
                  :key="index">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet"></DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="下部结构桥台" name="4">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.bottomStructureComponentName"
                  v-for="(detectDetail, index) in periodicDetectionConfiguration.bottomStructureAbutmentDetectionVos"
                  :key="index">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet"></DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
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

      configurationLoading: true,

      periodicDetectionConfiguration: {},

      displayBridgeId: null,

      activeName: '1'
    }
  },
  created() {
    this.getBridgeItem()
  },
  methods: {
    getBridgeItem() {
      getRequest('/bridge-info/bridge-name-id-map').then(res => {
        this.bridgeItemList = res
      })
    },
    handleBridgeIdSelectorValueChange() {
      this.getPeriodicDetectionConfiguration()
    },
    handleClose() {
      this.drawerVisible = false
    },
    getPeriodicDetectionConfiguration() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getRequest('/periodic-detection-conf/' + this.displayBridgeId).then(res => {
        this.periodicDetectionConfiguration = res
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
.inner-content {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-sheet {
  height: 700px;
  width: 70%;
  margin: 20px 20px 20px 20px;
}
</style>