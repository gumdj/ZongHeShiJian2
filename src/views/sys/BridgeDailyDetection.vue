<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="here">
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
          @click="dialogVisible = true; parentForm.bridgeId = displayBridgeId">新增</el-button>
    </el-form>
    <el-table
        :data="tableData"
        stripe
        v-loading="loading"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table stripe :data="props.row.historyResultsVos">
            <el-table-column
                label="检测项"
                align="center"
                prop="detectionItem"></el-table-column>
            <el-table-column
                label="完好"
                align="center"
                prop="isCompletion"></el-table-column>
            <el-table-column
                label="损坏类型"
                align="center"
                prop="damageType">
              <template slot-scope="scope">
                <span>{{scope.row.damageType.length === 0 ? '-' : scope.row.damageType}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="损坏程度"
                align="center"
                prop="damageDegree">
              <template slot-scope="scope">
                <span>{{scope.row.damageDegree.length === 0 ? '-' : scope.row.damageDegree}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="损坏位置"
                align="center"
                prop="damageLocation">
              <template slot-scope="scope">
                <span>{{scope.row.damageLocation.length === 0 ? '-' : scope.row.damageLocation}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="备注"
                align="center"
                prop="remark">
              <template slot-scope="scope">
                <el-button
                    @click="handleCheckRemark(scope.row.remark, props.row.routineDetectionDate, scope.row.detectionItem)"
                    type="text"
                    :disabled="!scope.row.remark">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
          type="index"
          label="序号"
          align="center"
          :index="(index) => {return index + 1}"></el-table-column>
      <el-table-column
          label="检测日期"
          align="center"
          prop="routineDetectionDate">
      </el-table-column>
      <el-table-column
          label="检测人"
          align="center"
          prop="username">
      </el-table-column>
    </el-table>
    <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose">
    <DailyDetectionCard style="height: 500px;">
      <div class="dividing-border-1">
        <el-steps :active="active" align-center>
          <el-step
              :title="item.detectionItemId.toString()"
              :description="item.detectionItem"
              v-for="(item, index) in routineDetectionItemList"
              :key="index"></el-step>
        </el-steps>
      </div>
      <div class="dividing-border-2">
        <el-form label-width="100px" style="margin: 10px 10px 10px 10px" :rules="rules" ref="editForm" :model="editForm">
          <el-row>
            <el-col align="center" :span="12">
              <el-form-item label="是否完好" prop="isCompletion">
                <el-radio-group v-model="editForm.isCompletion">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item style="margin-top: 40px" label="损坏类型" prop="damageType">
                <el-input :disabled="editForm.isCompletion !== '否'" v-model="editForm.damageType"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 40px" label="损坏程度" prop="damageDegree">
                <el-input :disabled="editForm.isCompletion !== '否'" v-model="editForm.damageDegree"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 40px" label="损坏位置" prop="damageLocation">
                <el-input :disabled="editForm.isCompletion !== '否'" v-model="editForm.damageLocation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input maxlength="512"
                          type="textarea"
                          :autosize="{ minRows: 6, maxRows: 6 }"
                          show-word-limit
                          :disabled="editForm.isCompletion !== '否'"
                          v-model="editForm.remark"></el-input>
              </el-form-item>
              <el-button
                  class="next-btn"
                  type="primary"
                  @click="handleNextAndSubmit()"
                  size="small">{{active === 10 ? '添  加' : '下一项'}}</el-button>
              <el-button
                  class="prev-btn"
                  :disabled="active === 0"
                  type="primary"
                  @click="handlePrev()"
                  size="small">上一项</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </DailyDetectionCard>
    </el-dialog>
  </div>
</template>

<script>
import DailyDetectionCard from "../inc/bridgeInfoComponents/bridgeCard/DailyDetectionCard";
import {getRequest, postRequest} from "../../axios";
export default {
  name: "BridgeDailyDetection",
  components: {DailyDetectionCard},
  data() {
    return {
      editForm: {
        isCompletion: null,
        damageDegree: '',
        damageLocation: '',
        damageType: '',
        remark: ''
      },
      parentForm: {
        bridgeId: null,
        routineDetectionDate: '',
        userId: null
      },
      rules: {
        isCompletion: [
          { required: true, message: '请选择是否完好', trigger: 'change' }
        ]
      },

      dialogVisible: false,

      displayBridgeId: null,

      tableData: [],

      bridgeItemList: [],
      routineDetectionItemList: [],

      routineDetectionResults: [],

      active: 0,

      loading: false
    }
  },
  created() {
    this.getRoutineDetectionItem()
    this.getBridgeItem()
  },
  methods: {
    getBridgeItem() {
      getRequest('/bridge-info/bridge-name-id-map').then(res => {
        this.bridgeItemList = res
      })
    },
    getRoutineDetectionItem() {
      getRequest('/routine-detection-item/all-items').then(res => {
        this.routineDetectionItemList = res
      })
    },
    getRoutineDetectionHistoryById() {
      this.loading = true
      getRequest('/routine-detection/history/' + this.displayBridgeId).then(res => {
        this.tableData = res
        this.loading = false
      })
    },
    handleBridgeIdSelectorValueChange(val) {
      this.getRoutineDetectionHistoryById(val)
    },
    handleCheckRemark(remark, date, detectionItem) {
      let displayMessage =
          '<strong>桥梁编号：</strong>' + this.displayBridgeId + '<br/>'
          + '<strong>检测日期：</strong>' + date + '<br/>'
          + '<strong>检测项：</strong>' + detectionItem + '<br/>'
          + '<strong>内容：</strong>' + remark
      this.$notify({
        title: '备注',
        dangerouslyUseHTMLString: true,
        message: displayMessage,
        duration: 0
      });
    },
    resetForm() {
      this.$refs['editForm'].resetFields()
      this.editForm = {
        isCompletion: null,
        damageDegree: '',
        damageLocation: '',
        damageType: '',
        remark: ''
      }
    },
    handleNextAndSubmit() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请检查输入项'
          })
          return
        }
        this.routineDetectionResults.push({
          detectionItemId: this.active + 1,
          isCompletion: this.editForm.isCompletion,
          bridgeId: null,
          damageDegree: this.editForm.damageDegree,
          damageType: this.editForm.damageType,
          damageLocation: this.editForm.damageLocation,
          remark: this.editForm.remark,
          routineDetectionDate: ''
        })
        if (this.active === 10) {
          postRequest('/routine-detection-result/result', {
            routineDetection: {
              bridgeId: this.parentForm.bridgeId,
              routineDetectionDate: this.parentForm.routineDetectionDate,
              userId: this.parentForm.userId,
            },
            routineDetectionResults: this.routineDetectionResults
          }).then(res => {
            if (res) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
            }
            this.dialogVisible = false
            this.getRoutineDetectionHistoryById()
            this.resetForm()
            this.routineDetectionResults.splice(0, this.routineDetectionResults.length)
            this.active = 0
          })
        } else {
          this.resetForm()
          this.active += 1
        }
      })
    },
    handlePrev() {
      if (this.active !== 0) {
        let prev = this.routineDetectionResults.pop()
        this.editForm = {
          isCompletion: prev.isCompletion,
          damageDegree: prev.damageDegree,
          damageLocation: prev.damageLocation,
          damageType: prev.damageType,
          remark: prev.remark
        }
        this.active -= 1
      }
    },
    handleClose() {
      this.dialogVisible = false
      this.resetForm()
      this.routineDetectionResults.splice(0, this.routineDetectionResults.length)
      this.active = 0
    }
  }
}
</script>

<style scoped>
.steps-border {
  width: 1650px;
  height: 120px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed;
  background-color: #F6F4ED;
  /*box-shadow: 10px 10px 5px #888888;*/
  margin: 10px;
}
.steps {
  width: 100%;
  margin: 20px;
}
.here {
  margin: 10px;
  padding: 0;
  height: 850px;
}
.nextBtn {
  position: absolute;
  bottom: 10%;
  right: 5%;
}
.el-form-item {
  margin-bottom: 0;
}
.dividing-border-1 {
  height: 110px;
  width: 100%;
  margin: 0;
  padding-top: 15px;
  border-radius: 4px;
  border: 1px dashed #888888;
}
.dividing-border-2 {
  height: 360px;
  width: 100%;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: 1px dashed #888888;
}
.next-btn {
  position: relative;
  right: -280px;
  bottom: -100px;
}
.prev-btn {
  position: relative;
  right: -80px;
  bottom: -100px;
}
</style>

<style>
.inputForm label {
  font-weight: bold;
}
</style>