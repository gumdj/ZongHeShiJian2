<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
            clearable
            v-model="searchName"
            @change="handleSearchFormChange"
            :trigger-on-focus="false"
            placeholder="桥梁名称"></el-input>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        style="width: 100%"
        stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-card shadow="always">
            <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
              <el-form-item label="设计单位">
                <span>{{ props.row.designOrganization }}</span>
              </el-form-item>
              <el-form-item label="建设单位">
                <span>{{ props.row.developmentOrganization }}</span>
              </el-form-item>
              <el-form-item label="管理单位">
                <span>{{ props.row.managementOrganization }}</span>
              </el-form-item>
              <el-form-item label="养护单位">
                <span>{{ props.row.maintenanceOrganization }}</span>
              </el-form-item>
              <el-form-item label="施工单位">
                <span>{{ props.row.constructionOrganization }}</span>
              </el-form-item>
              <el-form-item label="监理单位">
                <span>{{ props.row.supervisorOrganization }}</span>
              </el-form-item>
              <el-form-item label="养护等级">
                <span>{{ props.row.maintenanceClass }}</span>
              </el-form-item>
              <el-form-item label="养护类别">
                <span>{{ props.row.maintenanceType }}</span>
              </el-form-item>
              <el-form-item label="跨径组合">
                <span>{{ props.row.combinationModels }}</span>
              </el-form-item>
              <el-form-item label="最高水位(米)">
                <span>{{ props.row.highestWaterLevel }}</span>
              </el-form-item>
              <el-form-item label="桥梁总长(米)">
                <span>{{ props.row.length }}</span>
              </el-form-item>
              <el-form-item label="设计荷载">
                <span>{{ props.row.load }}</span>
              </el-form-item>
              <el-form-item label="限载标准">
                <span>{{ props.row.loadingLimit }}</span>
              </el-form-item>
              <el-form-item label="常水位(米)">
                <span>{{ props.row.ordinaryWaterLevel }}</span>
              </el-form-item>
              <el-form-item label="河道等级">
                <span>{{ props.row.riverWayClass }}</span>
              </el-form-item>
              <el-form-item label="车行道净宽">
                <span>{{ props.row.roadwayWidth }}</span>
              </el-form-item>
              <el-form-item label="人行道净宽">
                <span>{{ props.row.sidewalkWidth }}</span>
              </el-form-item>
              <el-form-item label="正斜交角(°)">
                <span>{{ props.row.skewAngle }}</span>
              </el-form-item>
              <el-form-item label="桥梁跨数">
                <span>{{ props.row.spanNum }}</span>
              </el-form-item>
              <el-form-item label="桥梁结构类型">
                <span>{{ bridgeTypes[props.row.structureId - 1].typeName }}</span>
              </el-form-item>
              <el-form-item label="桥梁总宽(米)">
                <span>{{ props.row.width }}</span>
              </el-form-item>
            </el-form>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column
          label="编号"
          align="center"
          prop="bridgeId">
      </el-table-column>
      <el-table-column
          label="名称"
          align="center"
          prop="bridgeName">
      </el-table-column>
      <el-table-column
          label="桥梁所在位置"
          align="center"
          prop="bridgeLocation">
      </el-table-column>
      <el-table-column
          label="建成日期"
          align="center"
          prop="completionDate">
      </el-table-column>
      <el-table-column
          label="制表日期"
          align="center"
          prop="tabulationDate">
      </el-table-column>
      <el-table-column
          label="制表人编号"
          align="center"
          prop="userId">
      </el-table-column>
      <el-table-column
          align="center"
          prop="deleted">
        <template slot="header" slot-scope="scope">
          <span style="color: red;font-weight: bold">是否弃用</span>
        </template>
        <template slot-scope="scope">
          <span style="font-weight: bold; color: red">{{ scope.row.deleted ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          prop="operation">
        <template slot-scope="scope">
          <el-button :disabled="currentType > 1" type="text" @click="handleUpdate(scope.row.bridgeId)">修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button :disabled="currentType > 1" type="text" @click="">弃用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getRequest} from "../../../axios";

export default {
  name: "ShowBridgeInfo",
  data() {
    return {
      total: 0,
      size: 10,
      current: 1,

      searchName: '',

      tableData: [],
      bridgeTypes: []
    }
  },
  props: ['currentType'],
  created() {
    this.getBridgeInfos()
    this.getBridgeTypes()
  },
  methods: {
    handleUpdate(bridgeId) {
      this.$emit('moveToUpdate', bridgeId)
    },
    getBridgeTypes() {
      getRequest('/structure-type/all-types').then(res => {
        this.bridgeTypes = res
      })
    },
    handleSearchFormChange(val) {
      this.getBridgeInfos()
    },
    getBridgeInfos() {
      getRequest('/bridge-info/all-info', {
        current: this.current,
        size: this.size,
        bridgeName: this.searchName
      }).then(res => {
        this.tableData = res.records
        this.size = res.size
        this.current = res.current
        this.total = res.total
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.getUserInfos()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getUserInfos()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 22px;
}
</style>

<style>
.demo-table-expand label {
  font-weight: bold;
}
.demo-table-expand {
  font-size: 0;
}
.special label {
  font-weight: bold;
  color: red;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50vh;
}
</style>