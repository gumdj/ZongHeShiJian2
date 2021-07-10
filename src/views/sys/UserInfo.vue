<template>
  <div>
    <el-button
        style="margin-top: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true">添加用户</el-button>
    <el-table
        :data="tableData"
        v-loading="loading"
        stripe>
      <el-table-column
          prop="userId"
          align="center"
          width="180px"
          sortable
          label="用户编号">
      </el-table-column>
      <el-table-column
          prop="username"
          align="center"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="gender"
          align="center"
          width="180px"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="address"
          align="center"
          label="地址">
      </el-table-column>
      <el-table-column
          prop="tel"
          align="center"
          label="联系方式">
      </el-table-column>
      <el-table-column
          prop="type"
          align="center"
          label="权限">
        <template slot-scope="scope">
          <span
              v-if="scope.row.type === 0"
              style="border-radius: 4px;background-color: mediumblue;color: #FFFFFF;font-weight: bold">
          &nbsp;系统管理员&nbsp;
          </span>
          <span
              v-if="scope.row.type === 1"
              style="border-radius: 4px;background-color: cornflowerblue;color: #FFFFFF;font-weight: bold">
          &nbsp;桥梁管理员&nbsp;
        </span>
          <span
              v-if="scope.row.type === 2"
              style="border-radius: 4px;background-color: greenyellow;color: #FFFFFF;font-weight: bold">
          &nbsp;日常检测员&nbsp;
        </span>
          <span
              v-if="scope.row.type === 3"
              style="border-radius: 4px;background-color: greenyellow;color: #FFFFFF;font-weight: bold">
          &nbsp;定期检测员&nbsp;
        </span>
          <span
              v-if="scope.row.type === 4"
              style="border-radius: 4px;background-color: red;color: #FFFFFF;font-weight: bold">
          &nbsp;封禁&nbsp;
        </span>
        </template>
      </el-table-column>
      <el-table-column
          prop="operation"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-popover
              placement="bottom"
              width="200"
              trigger="click">
            <el-button type="text"
                       slot="reference"
                       @click="handleModifyAuthorization(scope.row.userId, scope.row.type)"
                       :disabled="scope.row.type === 0">修改权限</el-button>
            <el-slider
                @change="handleTypeChange"
                v-if="scope.row.type !== 0"
                v-model="scope.row.type"
                :min="1"
                :max="4"
                :step="1"
                show-stops>
            </el-slider>
          </el-popover>
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
    <el-dialog
        title="用户信息"
        :visible.sync="dialogFormVisible"
        center
        width="400px"
        :before-close="handleClose">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="checkPassword">
          <el-input v-model="editForm.checkPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" label-width="50px" prop="gender">
              <el-select v-model="editForm.gender" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限" label-width="55px" prop="type">
              <el-select v-model="editForm.type" placeholder="权限">
                <el-option label="桥梁管理员" value="1"></el-option>
                <el-option label="日常检测员" value="2"></el-option>
                <el-option label="定期监测员" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="editForm.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRequest, postRequest, putRequest} from "../../axios";

export default {
  name: "UserInfo",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.editForm.checkPassword !== '') {
          this.$refs['editForm'].validateField('checkPassword');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      visible: false,

      total: 0,
      size: 10,
      current: 1,

      changeType: 0,
      changeUserId: null,

      editForm: {
        address: "",
        gender: "",
        password: "",
        tel: "",
        type: null,
        userId: null,
        username: "",
        checkPassword: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        type: [
          { required: true, message: '请选择权限', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
      },

      tableData: [],

      loading: true
    }
  },
  created() {
    this.getUserInfos()
  },
  methods: {
    handleClose() {
      this.resetForm('editForm')
      this.dialogFormVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postRequest('/user/register', {
            "address": this.editForm.address,
            "gender": this.editForm.gender,
            "password": this.editForm.password,
            "tel": this.editForm.tel,
            "type": this.editForm.type,
            "userId": null,
            "username": this.editForm.username
          }).then(res => {
            this.dialogFormVisible = false;
            this.getUserInfos()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          })
          this.resetForm('editForm')
        } else {
          this.$notify.error({
            title: '错误',
            message: '请检查输入项'
          })
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
      this.editForm = {
        address: "",
        gender: "",
        password: "",
        tel: "",
        type: null,
        userId: null,
        username: "",
        checkPassword: '',
      }
    },
    handleModifyAuthorization(userId, type) {
      this.changeUserId = userId
      this.changeType = type
    },
    handleTypeChange(val) {
      putRequest('/user/update', {
        'userId': this.changeUserId,
        'type': val
      }).then(res => {
        this.getUserInfos()
        this.$notify({
          title: '成功',
          message: '修改权限成功',
          type: 'success'
        })
      })
    },
    getUserInfos() {
      this.loading = true
      getRequest('/user/all-info/' + this.current + '/' + this.size).then(res => {
        this.tableData = res.records
        this.size = res.size
        this.current = res.current
        this.total = res.total
        this.loading = false
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