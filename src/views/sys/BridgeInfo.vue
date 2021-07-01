<template>
  <div>
    <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
      <el-tab-pane label="查看" name="first"><show-bridge-info @moveToUpdate="moveToUpdate" :currentType="currentType" ref="ShowBridgeInfo"/></el-tab-pane>
      <el-tab-pane :disabled="currentType > 1" label="添加" name="second"><add-bridge-info ref="AddBridgeInfo"/></el-tab-pane>
      <el-tab-pane :disabled="isDisabled" label="修改" name="third"><add-bridge-info ref="UpdateBridgeInfo"/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowBridgeInfo from "../inc/bridgeInfoComponents/ShowBridgeInfo";
import AddBridgeInfo from "../inc/bridgeInfoComponents/AddAndUpdateBridgeInfo";
import {getRequest} from "../../axios";
export default {
  name: "BridgeInfo",
  components: {AddBridgeInfo, ShowBridgeInfo},
  created() {
    getRequest('/user/info').then(res => {
      this.currentType = res.type
    })
  },
  data() {
    return {
      isDisabled: true,
      activeName: 'first',
      currentType: null
    }
  },
  methods: {
    moveToUpdate(bridgeId) {
      this.isDisabled = false
      this.$refs.UpdateBridgeInfo.editForm.bridgeId = bridgeId
      this.$refs.UpdateBridgeInfo.getStructureTypes()
      this.$refs.UpdateBridgeInfo.updateOrSave = '更新'
      getRequest('/bridge-info/' + bridgeId).then(res => {
        this.$refs.UpdateBridgeInfo.editForm = res
      })
      this.activeName = 'third'
    },
    handleClick(tab, event) {
      if (tab.name !== 'third') this.isDisabled = true
      if (tab.name === 'first') this.$refs.ShowBridgeInfo.getBridgeInfos()
      if (tab.name === 'second') {
        this.$refs.AddBridgeInfo.getStructureTypes()
        this.$refs.AddBridgeInfo.updateOrSave = '添加'
      }
    }
  }
}
</script>

<style scoped>

</style>