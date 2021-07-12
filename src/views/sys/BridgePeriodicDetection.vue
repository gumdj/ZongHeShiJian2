<template>
  <div>
    <el-form inline style="margin-top: 20px;">
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
          @click="handleClickAddBtn()">新增</el-button>
    </el-form>
    <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.bridgeDeckDetectionComponents" stripe border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.bridgeDeckDetectionResultVos" stripe border>
                  <el-table-column prop="bridgeDeckDetectionResultVos" label="检测结果" align="center">
                    <el-table-column prop="bridgeDeckDamageTypeName" label="损坏类型名" align="center"></el-table-column>
                    <el-table-column prop="bridgeDeckDeduction" label="扣分值" align="center"></el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="bridgeDeckComponentId" label="编号" align="center"></el-table-column>
            <el-table-column prop="bridgeDeckComponentName" label="桥面系构件类型名" align="center"></el-table-column>
          </el-table>
          <el-table :data="props.row.topStructureDetectionComponents" stripe border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.topStructureDetectionResultVos" stripe border>
                  <el-table-column prop="topStructureDetectionResultVos" label="检测结果" align="center">
                    <el-table-column prop="topStructureDamageTypeName" label="损坏类型名" align="center"></el-table-column>
                    <el-table-column prop="topStructureDeduction" label="扣分值" align="center"></el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="topStructureComponentId" label="编号" align="center"></el-table-column>
            <el-table-column prop="topStructureComponentName" label="上部结构构件类型名" align="center"></el-table-column>
            <el-table-column prop="topStructureSpanNum" label="所属跨数" align="center"></el-table-column>
          </el-table>
          <el-table :data="props.row.bottomStructurePierDetectionComponents" stripe border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.bottomStructureDetectionResultVos" stripe border>
                  <el-table-column prop="topStructureDetectionResultVos" label="检测结果" align="center">
                    <el-table-column prop="bottomStructureDamageTypeName" label="损坏类型名" align="center"></el-table-column>
                    <el-table-column prop="bottomStructureDeduction" label="扣分值" align="center"></el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="bottomStructureComponentId" label="编号" align="center"></el-table-column>
            <el-table-column prop="bottomStructureComponentName" label="下部结构桥墩构件类型名" align="center"></el-table-column>
            <el-table-column prop="bottomStructureSpanNum" label="所属跨数" align="center"></el-table-column>
          </el-table>
          <el-table :data="props.row.bottomStructureAbutmentDetectionComponents" stripe border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.bottomStructureDetectionResultVos">
                  <el-table-column prop="bottomStructureDetectionResultVos" label="检测结果" align="center">
                    <el-table-column prop="bottomStructureDamageTypeName" label="损坏类型名" align="center"></el-table-column>
                    <el-table-column prop="bottomStructureDeduction" label="扣分值" align="center"></el-table-column>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="bottomStructureComponentId" label="编号" align="center"></el-table-column>
            <el-table-column prop="bottomStructureComponentName" label="下部结构桥台构件类型名" align="center"></el-table-column>
            <el-table-column prop="bottomStructureSpanNum" label="所属跨数" align="center"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="periodicDetectionDate" label="日期" align="center"></el-table-column>
      <el-table-column prop="username" label="定期检测负责人" align="center"></el-table-column>

    </el-table>
    <el-drawer
        title=""
        :before-close="handleClose"
        :visible.sync="drawerVisible"
        direction="btt"
        v-loading="configurationLoading"
        custom-class="demo-drawer"
        :wrapperClosable="false"
        size="100%"
        ref="drawer"
    >
      <el-button @click="submitForm()" type="primary" size="small" style="width: 90px; position: absolute; z-index: 100; top: 2%; left: 2%">提交</el-button>
      <div class="demo-drawer__content">
        <el-tabs :stretch="true">
          <el-tab-pane label="桥面系" name="0">
            <el-tabs  type="border-card">
              <el-tab-pane
                  :label="detectDetail.bridgeDeckComponentName"
                  v-for="(detectDetail, index1) in periodicDetectionConfiguration.bridgeDeckDetectionVos"
                  @tab-click="handleTabClick"
                  :key="index1">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet">
                    <el-form :inline="true"  :model="periodicDetectionResultDto" :rules="rules" ref="BridgeDeckDetectionResult" label-width="200px" style="margin-top: 20px;">
                      <el-form-item :label="DamageType.bridgeDeckDamageTypeName" v-for="(DamageType,index2) in detectDetail.bridgeDeckDamageTypeVos" :key="index2">
                        <el-select v-model="periodicDetectionResultDto.bridgeDeckDetectionDtoList[index1].bridgeDeckDetectionResults[index2].bridgeDeckDeduction"  placeholder="请选择">
                          <el-option :label="DamageClass.bridgeDeckDamageClassName" :value="DamageClass.bridgeDeckClassDeduction" v-for="(DamageClass,index) in DamageType.bridgeDeckDamageClassVos" :key="index"></el-option>
                        </el-select>
                        <el-popover
                            placement="top-start"
                            popper-class="explanation"
                            title="损坏类型说明"
                            width="200"
                            trigger="hover"
                            :content="DamageType.bridgeDeckDamageTypeExplanation">
                          <el-button slot="reference" icon="el-icon-info" style="padding: 0;margin-left: 5px;" circle ></el-button>
                        </el-popover>
                      </el-form-item>
                    </el-form>
                  </DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="上部结构" name="1">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.topStructureComponentName"
                  v-for="(detectDetail, index1) in periodicDetectionConfiguration.topStructureDetectionVos"
                  :key="index1">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet">
                    <el-steps :active="topActive.active[index1]" finish-status="success" align-center>
                      <el-step :title="'第'+spanNum+'跨'"  v-for="(spanNum,key) in periodicDetectionConfiguration.spanNum" :key="key">
                      </el-step>
                    </el-steps>
                    <el-divider></el-divider>
                    <el-form :inline="true" :model="periodicDetectionResultDto" :rules="rules" ref="periodicDetectionResultDto" label-width="200px">
                      <el-form-item :label="DamageType.topStructureDamageTypeName" v-for="(DamageType,index2) in detectDetail.topStructureDamageTypeVos" :key="index2">
                        <el-select v-model="periodicDetectionResultDto.topStructureDetectionDtoList[topActive.active[index1]][index1].topStructureDetectionResults[index2].topStructureDeduction" placeholder="请选择" >
                          <el-option :label="DamageClass.topStructureDamageClassName" :value="DamageClass.topStructureClassDeduction" v-for="(DamageClass,index) in DamageType.topStructureDamageClassVos" :key="index"></el-option>
                        </el-select>
                        <el-popover
                            placement="top-start"
                            popper-class="explanation"
                            title="损坏类型说明"
                            width="200"
                            trigger="hover"
                            :content="DamageType.topStructureDamageTypeExplanation">
                          <el-button slot="reference" icon="el-icon-info" style="padding: 0;margin-left: 5px;" circle ></el-button>
                        </el-popover>
                      </el-form-item>
                    </el-form>
                    <el-button :disabled="topActive.active[index1] === 0" style="margin-left: 40%"  @click="prev(topActive, index1)">上一跨</el-button>
                    <el-button :disabled="topActive.active[index1] === periodicDetectionConfiguration.spanNum - 1" @click="next(topActive, index1)">下一跨</el-button>
                  </DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="下部结构桥墩" name="2">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.bottomStructureComponentName"
                  v-for="(detectDetail, index1) in periodicDetectionConfiguration.bottomStructurePierDetectionVos"
                  :key="index1">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet">

                    <el-steps :active="pierActive.active[index1]" finish-status="success" align-center>

                      <el-step :title="'第'+spanNum+'桥墩'"  v-for="(spanNum,key) in periodicDetectionConfiguration.spanNum" :key="key">
                      </el-step>

                    </el-steps>

                    <el-divider></el-divider>

                    <el-form :inline="true" :model="periodicDetectionResultDto" :rules="rules" ref="periodicDetectionResultDto" label-width="200px">
                      <el-form-item :label="DamageType.bottomStructureDamageTypeName" v-for="(DamageType,index2) in detectDetail.bottomStructureDamageTypeVos" :key="index2">
                        <el-select  v-model="periodicDetectionResultDto.bottomStructurePierDetectionDtoList[pierActive.active[index1]][index1].bottomStructureDetectionResults[index2].bottomStructureDeduction" placeholder="请选择" >
                          <el-option :label="DamageClass.bottomStructureDamageClassName" :value="DamageClass.bottomStructureClassDeduction" v-for="(DamageClass,index) in DamageType.bottomStructureDamageClassVos" :key="index"></el-option>
                        </el-select>
                        <el-popover
                            placement="top-start"
                            popper-class="explanation"
                            title="损坏类型说明"
                            width="200"
                            trigger="hover"
                            :content="DamageType.bottomStructureDamageTypeExplanation">
                          <el-button slot="reference" icon="el-icon-info" style="padding: 0;margin-left: 5px;" circle ></el-button>
                        </el-popover>
                      </el-form-item>
                    </el-form>

                    <el-button :disabled="pierActive.active[index1] === 0" style="margin-left: 40%"  @click="prev(pierActive, index1)">上一桥墩</el-button>
                    <el-button :disabled="pierActive.active[index1] === periodicDetectionConfiguration.spanNum - 1" @click="next(pierActive, index1)">下一桥墩</el-button>

                  </DailyDetectionCard>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="下部结构桥台" name="3">
            <el-tabs type="border-card">
              <el-tab-pane
                  :label="detectDetail.bottomStructureComponentName"
                  v-for="(detectDetail, index1) in periodicDetectionConfiguration.bottomStructureAbutmentDetectionVos"
                  :key="index1">
                <div class="inner-content">
                  <DailyDetectionCard class="input-sheet">
                    <el-steps :active="abutmentActive.active[index1]" finish-status="success" align-center>
                      <el-step :title="'第'+spanNum+'桥台'"  v-for="(spanNum,key) in periodicDetectionConfiguration.spanNum" :key="key">
                      </el-step>
                    </el-steps>
                    <el-divider></el-divider>
                    <el-form :inline="true"  :model="periodicDetectionResultDto" :rules="rules" ref="periodicDetectionResultDto" label-width="200px">
                      <el-form-item :label="DamageType.bottomStructureDamageTypeName" v-for="(DamageType,index2) in detectDetail.bottomStructureDamageTypeVos" :key="index2">
                        <el-select v-model="periodicDetectionResultDto.bottomStructureAbutmentDetectionDtoList[abutmentActive.active[index1]][index1].bottomStructureDetectionResults[index2].bottomStructureDeduction" placeholder="请选择" >
                          <el-option :label="DamageClass.bottomStructureDamageClassName" :value="DamageClass.bottomStructureClassDeduction" v-for="(DamageClass,index) in DamageType.bottomStructureDamageClassVos" :key="index"></el-option>
                        </el-select>
                        <el-popover
                            placement="top-start"
                            popper-class="explanation"
                            title="损坏类型说明"
                            width="200"
                            trigger="hover"
                            :content="DamageType.bottomStructureDamageTypeExplanation">
                          <el-button slot="reference" icon="el-icon-info" style="padding: 0;margin-left: 5px;" circle ></el-button>
                        </el-popover>
                      </el-form-item>
                    </el-form>
                    <el-button :disabled="abutmentActive.active[index1] === 0" style="margin-left: 40%"  @click="prev(abutmentActive, index1)">上一桥台</el-button>
                    <el-button :disabled="abutmentActive.active[index1] === periodicDetectionConfiguration.spanNum - 1" @click="next(abutmentActive, index1)">下一桥台</el-button>
                  </DailyDetectionCard>
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
import {getRequest, postRequest} from "../../axios";
export default {
  name: "BridgePeriodicDetection",
  components: {DailyDetectionCard},
  data() {
    return {
      loading: false,

      tableData: [],

      bridgeItemList: [],

      drawerVisible: false,

      configurationLoading: true,

      periodicDetectionConfiguration: {},

      displayBridgeId: null,

      topActive: {
        active: []
      },

      pierActive: {
        active: []
      },

      abutmentActive: {
        active: []
      },

      periodicDetectionResultDto: {
        bridgeDeckDetectionDtoList: [],
        topStructureDetectionDtoList: [],
        bottomStructurePierDetectionDtoList :[],
        bottomStructureAbutmentDetectionDtoList: [],
        bridgeId: null,
        userId: null,
        periodicDetectionDate: ''
      },

      rules: {}
    }
  },
  created() {
    this.getBridgeItem()
  },
  methods: {
    handleClickAddBtn() {
      this.drawerVisible = true
    },
    getBridgePeriodicDetectionHistory() {
      this.loading = true
      getRequest('/periodic-detection/info/' + this.displayBridgeId).then(res => {
        this.tableData = res
        this.loading = false
      })
    },
    createEditForm() {
      this.periodicDetectionResultDto.bridgeDeckDetectionDtoList = []
      this.periodicDetectionConfiguration.bridgeDeckDetectionVos.forEach(i => {
        let BridgeDeckDetectionDto = {
          bridgeDeckDetectionResults: [],
          weight: i.weight
        }
        i.bridgeDeckDamageTypeVos.forEach(j => {
          let BridgeDeckDetectionResult = {
            bridgeDeckDamageTypeId: j.bridgeDeckDamageTypeId,
            bridgeDeckDeduction: j.bridgeDeckDamageClassVos[0].bridgeDeckClassDeduction,
            bridgeId: null,
            periodicDetectionDate: ''
          }
          BridgeDeckDetectionDto.bridgeDeckDetectionResults.push(BridgeDeckDetectionResult)
        })
        this.periodicDetectionResultDto.bridgeDeckDetectionDtoList.push(BridgeDeckDetectionDto)
      })

      this.periodicDetectionResultDto.topStructureDetectionDtoList = []
      for (let num = 1; num <= this.periodicDetectionConfiguration.spanNum; ++num) {
        let spanDetectList = []
        this.periodicDetectionConfiguration.topStructureDetectionVos.forEach(i => {
          let TopStructureDetectionDto = {
            topStructureDetectionResults: [],
            weight: i.weight
          }
          i.topStructureDamageTypeVos.forEach(j => {
            let TopStructureDetectionResult = {
              bridgeId: null,
              periodicDetectionDate: "",
              topStructureDamageTypeId: j.topStructureDamageTypeId,
              topStructureDeduction: j.topStructureDamageClassVos[0].topStructureClassDeduction,
              topStructureSpanNum: num
            }
            TopStructureDetectionDto.topStructureDetectionResults.push(TopStructureDetectionResult)
          })
          spanDetectList.push(TopStructureDetectionDto)
        })
        this.periodicDetectionResultDto.topStructureDetectionDtoList.push(spanDetectList)
      }

      this.periodicDetectionResultDto.bottomStructurePierDetectionDtoList = []
      for (let num = 1; num <= this.periodicDetectionConfiguration.spanNum; ++num) {
        let spanDetectList = []
        this.periodicDetectionConfiguration.bottomStructurePierDetectionVos.forEach(i => {
          let BottomStructurePierDetectionDto = {
            bottomStructureDetectionResults: [],
            weight: i.weight
          }
          i.bottomStructureDamageTypeVos.forEach(j => {
            let BottomStructureDetectionResult = {
                  bottomStructureDamageTypeId: j.bottomStructureDamageTypeId,
                  bottomStructureDeduction: j.bottomStructureDamageClassVos[0].bottomStructureClassDeduction,
                  bottomStructureSpanNum: num,
                  bridgeId: null,
                  periodicDetectionDate: ""
                }
            BottomStructurePierDetectionDto.bottomStructureDetectionResults.push(BottomStructureDetectionResult)
          })
          spanDetectList.push(BottomStructurePierDetectionDto)
        })
        this.periodicDetectionResultDto.bottomStructurePierDetectionDtoList.push(spanDetectList)
      }

      this.periodicDetectionResultDto.bottomStructureAbutmentDetectionDtoList = []
      for (let num = 1; num <= this.periodicDetectionConfiguration.spanNum; ++num) {
        let spanDetectList = []
        this.periodicDetectionConfiguration.bottomStructureAbutmentDetectionVos.forEach(i => {
          let BottomStructurePierDetectionDto= {
            bottomStructureDetectionResults: [],
            weight: i.weight
          }
          i.bottomStructureDamageTypeVos.forEach(j => {
            let BottomStructureDetectionResult= {
              bottomStructureDamageTypeId: j.bottomStructureDamageTypeId,
              bottomStructureDeduction: j.bottomStructureDamageClassVos[0].bottomStructureClassDeduction,
              bottomStructureSpanNum: num,
              bridgeId: null,
              periodicDetectionDate: ""
            }
            BottomStructurePierDetectionDto.bottomStructureDetectionResults.push(BottomStructureDetectionResult)
          })
          spanDetectList.push(BottomStructurePierDetectionDto)
        })
        this.periodicDetectionResultDto.bottomStructureAbutmentDetectionDtoList.push(spanDetectList)
      }

    },
    getBridgeItem() {
      getRequest('/bridge-info/bridge-name-id-map').then(res => {
        this.bridgeItemList = res
      })
    },
    handleBridgeIdSelectorValueChange(val) {
      this.getPeriodicDetectionConfiguration()
      this.getBridgePeriodicDetectionHistory()
    },
    handleClose() {
      this.drawerVisible = false
    },
    getPeriodicDetectionConfiguration() {
      const loading = this.$loading({
        lock: true,
        text: '正在配置定期检测项',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getRequest('/periodic-detection-conf/' + this.displayBridgeId).then(res => {
        this.periodicDetectionConfiguration = res
        this.topActive.active = new Array(this.periodicDetectionConfiguration.topStructureDetectionVos.length).fill(0)
        this.pierActive.active = new Array(this.periodicDetectionConfiguration.bottomStructurePierDetectionVos.length).fill(0)
        this.abutmentActive.active = new Array(this.periodicDetectionConfiguration.bottomStructureAbutmentDetectionVos.length).fill(0)
        this.createEditForm()
        loading.close()
      })
    },
    handleTabClick(tab) {
      tab.name()
    },
    prev(active, index) {
      if(active.active[index] > 0) {
        active.active[index]--
      }
      this.$forceUpdate()
    },
    next(active, index) {
      if(active.active[index] !==  this.periodicDetectionConfiguration.spanNum - 1) {
        active.active[index]++
      }
      this.$forceUpdate()
    },
    submitForm() {
      const loading = this.$loading({
        lock: true,
        text: '正在提交',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.periodicDetectionResultDto.bridgeId = this.displayBridgeId
      postRequest('/periodic-detection/results', this.periodicDetectionResultDto).then(res => {
        loading.close()
        let displayMessage = '<strong>总体BCI：</strong>' + res.obj.bci + '</br>' +
                              '<strong>总体BSI：</strong>' + res.obj.bsi + '</br>' +
                              '<strong>上部结构BCI：</strong>' + res.obj.topBci + '</br>' +
                              '<strong>上部结构BSI：</strong>' + res.obj.topBsi + '</br>' +
                              '<strong>下部结构BCI：</strong>' + res.obj.bottomBci + '</br>' +
                              '<strong>下部结构BSI：</strong>' + res.obj.bottomBsi + '</br>' +
                              '<strong>桥面系BCI：</strong>' + res.obj.bridgeDeckBci + '</br>' +
                              '<strong>桥面系BSI：</strong>' + res.obj.bridgeDeckBsi + '</br>' +
                              '<strong>完好状态等级：</strong>' + res.obj.intactConditionClass + '</br>' +
                              '<strong>结构状态等级：</strong>' + res.obj.structureConditionClass + '</br>' +
                              '<strong>检测日期：</strong>' + res.obj.periodicDetectionDate
        this.$notify.info({
          title: res.msg,
          dangerouslyUseHTMLString: true,
          message: displayMessage,
          duration: 0
        })
        this.getBridgePeriodicDetectionHistory()
        this.drawerVisible = false
      })
    }
  }
}
</script>

<style scoped>
.inner-content {
  width: 100%;
  height: 73vh;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-sheet {
  height: 80%;
  width: 70%;
  margin: 20px 20px 20px 20px;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}
</style>

<style>
.explanation .el-popover__title {
  font-weight: bold;
}
</style>