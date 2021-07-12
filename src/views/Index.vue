<template>
  <div>
    <el-select style="margin-top: 20px; margin-bottom: 10px" v-model="displayBridgeId" @change="handleChangeBridge">
      <el-option :label="item.bridgeName" :value="item.bridgeId" v-for="(item, index) in bridgeItemList" :key="index"></el-option>
    </el-select>
    <el-row>
      <el-col :span="12">
        <ve-line :loading="isLoading" :dataEmpty="isDataEmpty" height="300px" :data="generalData" :settings="chartSettings"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line :loading="isLoading" :dataEmpty="isDataEmpty" height="300px" :data="bridgeDeckData" :settings="chartSettings"></ve-line>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ve-line :loading="isLoading" :dataEmpty="isDataEmpty" height="300px" :data="topData" :settings="chartSettings"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line :loading="isLoading" :dataEmpty="isDataEmpty" height="300px" :data="bottomData" :settings="chartSettings"></ve-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getRequest} from "../axios";
import 'v-charts-v2/lib/style.css';

export default {
  name: "Index",
  data() {
    return {
      bridgeItemList: [ ],

      displayBridgeId: null,

      isDataEmpty: true,
      isLoading: false,

      chartSettings: {},
      generalData: {
        columns: ['日期', '总体BSI', '总体BCI', '完好状况评估等级', '结构状况评估等级'],
        rows: []
      },
      topData: {
        columns: ['日期', '上部结构BCI', '上部结构BSI'],
        rows: []
      },
      bottomData: {
        columns: ['日期', '下部结构BCI', '下部结构BSI'],
        rows: []
      },
      bridgeDeckData: {
        columns: ['日期', '桥面系BCI', '桥面系BSI'],
        rows: []
      },
    }
  },
  created() {
    this.getBridgeItem()
  },
  methods: {
    handleChangeBridge() {
      this.getData(this.displayBridgeId)
    },
    getBridgeItem() {
      getRequest('/bridge-info/bridge-name-id-map').then(res => {
        this.bridgeItemList = res
      })
    },
    getData(bridgeId) {
      this.isLoading = true
      getRequest('/periodic-detection/' + bridgeId).then(res => {
        if (res.length === 0) {
          this.isDataEmpty = true
        } else this.isDataEmpty = false
        this.generalData.rows = []
        this.bridgeDeckData.rows = []
        this.topData.rows = []
        this.bottomData.rows = []
        res.forEach(i => {
          this.generalData.rows.push({
            '日期': i.periodicDetectionDate,
            '总体BCI': i.bci,
            '总体BSI': i.bsi,
            '完好状况评估等级': i.intactConditionClass,
            '结构状况评估等级': i.structureConditionClass
          })
          this.bridgeDeckData.rows.push({
            '日期': i.periodicDetectionDate,
            '桥面系BCI': i.bridgeDeckBci,
            '桥面系BSI': i.bridgeDeckBsi
          })
          this.topData.rows.push({
            '日期': i.periodicDetectionDate,
            '上部结构BCI': i.topBci,
            '上部结构BSI': i.topBsi
          })
          this.bottomData.rows.push({
            '日期': i.periodicDetectionDate,
            '下部结构BCI': i.bottomBci,
            '下部结构BSI': i.bottomBsi
          })
        })
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>