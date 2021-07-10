<template>
  <div class="here">
    <strong class="title">桥梁资料卡</strong>
    <BridgeInfoCard>
      <el-form
          class="form"
          :model="editForm"
          :rules="rules"
          ref="editForm"
          label-width="130px">
        <el-row class="row">
          <el-col align="center" :span="7">
            <el-form-item label="桥梁名称" prop="bridgeName">
              <el-input placeholder="请输入桥梁名称" size="small" v-model="editForm.bridgeName"></el-input>
            </el-form-item>
            <el-form-item label="所在位置" prop="bridgeLocation">
              <el-input placeholder="请输入所在位置" size="small" v-model="editForm.bridgeLocation"></el-input>
            </el-form-item>
            <el-form-item label="建成日期" prop="completionDate">
              <el-date-picker placeholder="请选择建成日期" :editable="false" type="date" size="small" style="width: 100%;" v-model="editForm.completionDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="施工单位" prop="constructionOrganization">
              <el-input placeholder="请输入施工单位" size="small" v-model="editForm.constructionOrganization"></el-input>
            </el-form-item>
            <el-form-item label="设计单位" prop="designOrganization">
              <el-input placeholder="请输入设计单位" size="small" v-model="editForm.designOrganization"></el-input>
            </el-form-item>
            <el-form-item label="建设单位" prop="developmentOrganization">
              <el-input placeholder="请输入建设单位" size="small" v-model="editForm.developmentOrganization"></el-input>
            </el-form-item>
            <el-form-item label="养护单位" prop="maintenanceOrganization">
              <el-input placeholder="请输入养护单位" size="small" v-model="editForm.maintenanceOrganization"></el-input>
            </el-form-item>
            <el-form-item label="监理单位" prop="supervisorOrganization">
              <el-input placeholder="请输入监理单位" size="small" v-model="editForm.supervisorOrganization"></el-input>
            </el-form-item>
            <el-form-item label="管理单位" prop="managementOrganization">
              <el-input placeholder="请输入管理单位" size="small" v-model="editForm.managementOrganization"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="height: 100%" align="center" :span="1">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col align="center" :span="8">
            <el-form-item label="跨径组合" prop="combinationModels">
              <el-input placeholder="请输入跨径组合" size="small" v-model="editForm.combinationModels"></el-input>
            </el-form-item>
            <el-form-item label="最高水位(米)" prop="highestWaterLevel">
              <el-input placeholder="请输入最高水位" size="small" v-model="editForm.highestWaterLevel"></el-input>
            </el-form-item>
            <el-form-item label="常水位(米)" prop="ordinaryWaterLevel">
              <el-input placeholder="请输入常水位" size="small" v-model="editForm.ordinaryWaterLevel"></el-input>
            </el-form-item>
            <el-form-item label="桥梁总长(米)" prop="length">
              <el-input placeholder="请输入桥梁总长" size="small" v-model="editForm.length"></el-input>
            </el-form-item>
            <el-form-item label="桥梁总宽(米)" prop="width">
              <el-input placeholder="请输入桥梁总宽" size="small" v-model="editForm.width"></el-input>
            </el-form-item>
            <el-form-item label="限载标准" prop="loadingLimit">
              <el-input placeholder="请输入限载标准" size="small" v-model="editForm.loadingLimit"></el-input>
            </el-form-item>
            <el-form-item label="设计荷载(吨)" prop="load">
              <el-input placeholder="请输入设计荷载" size="small" v-model="editForm.load"></el-input>
            </el-form-item>
            <el-form-item label="养护类别" prop="maintenanceType">
              <el-select placeholder="请选择养护类别" style="width: 100%;" size="small" v-model="editForm.maintenanceType">
                <el-option label="Ⅰ类" value="1"></el-option>
                <el-option label="Ⅱ类" value="2"></el-option>
                <el-option label="Ⅲ类" value="3"></el-option>
                <el-option label="Ⅳ类" value="4"></el-option>
                <el-option label="Ⅴ类" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="养护等级" prop="maintenanceClass">
              <el-select placeholder="请选择养护等级" style="width: 100%;" size="small" v-model="editForm.maintenanceClass">
                <el-option label="A级" value="A"></el-option>
                <el-option label="B级" value="B"></el-option>
                <el-option label="C级" value="C"></el-option>
                <el-option label="D级" value="D"></el-option>
                <el-option label="E级" value="E"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="height: 100%" align="center" :span="1">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col align="center" :span="7">
            <el-form-item label="河道等级" prop="riverWayClass">
              <el-select placeholder="请选择河道等级" style="width: 100%;" size="small" v-model="editForm.riverWayClass">
                <el-option label="A级" value="A"></el-option>
                <el-option label="B级" value="B"></el-option>
                <el-option label="C级" value="C"></el-option>
                <el-option label="D级" value="D"></el-option>
                <el-option label="E级" value="E"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车行道净宽(米)" prop="roadwayWidth">
              <el-input placeholder="请输入车行道净宽" size="small" v-model="editForm.roadwayWidth"></el-input>
            </el-form-item>
            <el-form-item label="人行道净宽(米)" prop="sidewalkWidth">
              <el-input placeholder="请输入人行道净宽" size="small" v-model="editForm.sidewalkWidth"></el-input>
            </el-form-item>
            <el-form-item label="正斜交角(°)" prop="skewAngle">
              <el-input placeholder="请输入正斜交角" size="small" v-model="editForm.skewAngle"></el-input>
            </el-form-item>
            <el-form-item label="桥梁跨数" prop="spanNum">
              <el-input-number :min="1" style="width: 100%" placeholder="请输入桥梁跨数" size="small" v-model="editForm.spanNum"></el-input-number>
            </el-form-item>
            <el-form-item label="桥梁结构类型" prop="structureId">
              <el-select placeholder="请选择桥梁结构类型" style="width: 100%;" size="small" v-model="editForm.structureId">
                <el-option :label="item.typeName" :value="item.structureId" v-for="(item, index) in itemList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抗震烈度(度)" prop="antiknock">
              <el-input placeholder="请输入抗震烈度" size="small" v-model="editForm.antiknock"></el-input>
            </el-form-item>
            <el-form-item label="桥面面积(平方米)" prop="area">
              <el-input placeholder="请输入桥面面积" size="small" v-model="editForm.area"></el-input>
            </el-form-item>
            <el-form-item label="总造价(元)" prop="cost">
              <el-input placeholder="请输入总造价" size="small" v-model="editForm.cost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </BridgeInfoCard>
    <el-button
        circle
        type="primary"
        style="position: absolute;top: 1px;left: 8px;"
        icon="el-icon-plus"
        @click="submitForm('editForm')"></el-button>

  </div>
</template>

<script>
import BridgeInfoCard from "./bridgeCard/BridgeInfoCard";
import {getRequest, postRequest, putRequest} from "../../../axios";
export default {
  name: "AddBridgeInfo",
  data() {
    return {
      updateOrSave: '',
      itemList : [],
      editForm: {
        bridgeId: null,
        bridgeName: '',
        bridgeLocation: '',
        area: '',
        completionDate: '',
        constructionOrganization: '',
        designOrganization: '',
        developmentOrganization: '',
        maintenanceOrganization: '',
        supervisorOrganization: '',
        cost: '',
        combinationModels: '',
        highestWaterLevel: '',
        ordinaryWaterLevel: '',
        length: '',
        width: '',
        loadingLimit: '',
        load: '',
        maintenanceType: '',
        maintenanceClass: '',
        riverWayClass: '',
        roadwayWidth: '',
        sidewalkWidth: '',
        skewAngle: '',
        spanNum: '',
        structureId: '',
        userId: null,
        tabulationDate: ''
      },
      rules: {
        bridgeName: [
          {required: true, message: '桥梁名称不能为空', trigger: 'blur'}
        ],
        bridgeLocation: [
          {required: true, message: '桥梁所在位置不能为空', trigger: 'blur'}
        ],
        completionDate: [
          {required: true, message: '建成日期不能为空', trigger: 'blur'}
        ],
        constructionOrganization: [
          {required: true, message: '施工单位不能为空', trigger: 'blur'}
        ],
        designOrganization: [
          {required: true, message: '设计单位不能为空', trigger: 'blur'}
        ],
        developmentOrganization: [
          {required: true, message: '建设单位不能为空', trigger: 'blur'}
        ],
        maintenanceOrganization: [
          {required: true, message: '养护单位不能为空', trigger: 'blur'}
        ],
        supervisorOrganization: [
          {required: true, message: '监理单位不能为空', trigger: 'blur'}
        ],
        cost: [
          {required: true, message: '总造价不能为空', trigger: 'blur'}
        ],
        combinationModels: [
          {required: true, message: '跨径组合不能为空', trigger: 'blur'}
        ],
        highestWaterLevel: [
          {required: true, message: '最高水位不能为空', trigger: 'blur'}
        ],
        ordinaryWaterLevel: [
          {required: true, message: '常水位不能为空', trigger: 'blur'}
        ],
        length: [
          {required: true, message: '桥梁总长不能为空', trigger: 'blur'}
        ],
        width: [
          {required: true, message: '桥梁总宽不能为空', trigger: 'blur'}
        ],
        loadingLimit: [
          {required: true, message: '限载标准不能为空', trigger: 'blur'}
        ],
        load: [
          {required: true, message: '设计荷载不能为空', trigger: 'blur'}
        ],
        maintenanceType: [
          {required: true, message: '养护类别不能为空', trigger: 'change'}
        ],
        maintenanceClass: [
          {required: true, message: '养护等级不能为空', trigger: 'change'}
        ],
        riverWayClass: [
          {required: true, message: '河道等级不能为空', trigger: 'change'}
        ],
        roadwayWidth: [
          {required: true, message: '车行道净宽不能为空', trigger: 'blur'}
        ],
        sidewalkWidth: [
          {required: true, message: '人行道净宽不能为空', trigger: 'blur'}
        ],
        skewAngle: [
          {required: true, message: '正斜交角不能为空', trigger: 'blur'}
        ],
        spanNum: [
          {required: true, message: '桥梁跨数不能为空', trigger: 'blur'}
        ],
        structureId: [
          {required: true, message: '桥梁结构类型不能为空', trigger: 'change'}
        ],
        managementOrganization: [
          {required: true, message: '管理单位不能为空', trigger: 'blur'}
        ],
        antiknock: [
          {required: true, message: '抗震烈度不能为空', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '桥梁面积不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.editForm = {
        bridgeId: null,
        bridgeName: '',
        bridgeLocation: '',
        completionDate: '',
        constructionOrganization: '',
        designOrganization: '',
        developmentOrganization: '',
        maintenanceOrganization: '',
        managementOrganization: '',
        antiknock: '',
        supervisorOrganization: '',
        cost: '',
        combinationModels: '',
        highestWaterLevel: '',
        ordinaryWaterLevel: '',
        length: '',
        width: '',
        loadingLimit: '',
        load: '',
        maintenanceType: '',
        maintenanceClass: '',
        riverWayClass: '',
        roadwayWidth: '',
        sidewalkWidth: '',
        skewAngle: '',
        spanNum: '',
        structureId: '',
        userId: null,
        tabulationDate: ''
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.bridgeId === null) {
            postRequest('/bridge-info', this.editForm).then(res => {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.resetForm('editForm')
            })
          } else {

          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请检查输入项'
          });
        }
      })
    },
    getStructureTypes() {
      getRequest('/structure-type/all-types').then(res => {
        this.itemList = res
      })
    }
  },
  components: {BridgeInfoCard}
}
</script>

<style>
.el-divider--vertical {
  height: 100%;
}
.form .el-form-item label {
  font-weight: bold;
}
.form .el-form-item {
  margin: 35px 0;
}
</style>

<style scoped>
.title {
  position: absolute;
  top: 60px;
  z-index: 100;
}
.row {
  height: 100%;
  padding: 30px;
  border: 1px dashed #CBCED5;
  border-radius: 4px;
}
.el-divider {
  background-color: #DCDFE6;
}
.form {
  width: 100%;
}
.here {
  margin: 0;
  /* 弹性布局 让页面元素垂直+水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 让页面始终占浏览器总高 */
  height: 850px;
}
</style>