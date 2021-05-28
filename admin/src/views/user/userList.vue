<template>
  <div>

    <el-table
      :data="users"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="realname" label="真实姓名"> </el-table-column>
      <el-table-column prop="role" label="角色"/>
      <el-table-column prop="last_time" label="上次登录时间"/>
      <el-table-column prop="relation" label="实际身份"/>
      <el-table-column prop="state" label="状态"/>
      <el-table-column label="相关论文数">
        <template slot-scope="scope">
            <el-popover
                placement="top-start"
                title="论文名"
                width="200"
                trigger="hover"
                :content="scope.row.papers.map(paper=>paper.title).join('\n')">
                <span slot="reference">{{  scope.row.papers?scope.row.papers.length:0 }}</span>
            </el-popover>
        </template>
      </el-table-column>
        <el-table-column label="相关专利数">
         <template slot-scope="scope">
            <el-popover
                placement="top-start"
                title="专利名"
                width="200"
                trigger="hover"
                :content="scope.row.patents.map(patent=>patent.patent_name).join('\n')">
                <span slot="reference">{{  scope.row.patents?scope.row.patents.length:0 }}</span>
            </el-popover>
        </template>
      </el-table-column>
    <el-table-column label="相关项目数">
        <template slot-scope="scope">
          <el-popover
                placement="top-start"
                title="项目名"
                width="200"
                trigger="hover"
                :content="scope.row.projects.map(project=>project.title).join('\n')">
                <span slot="reference">{{  scope.row.projects?scope.row.projects.length:0 }}</span>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="相关比赛数">
        <template slot-scope="scope">
          <el-popover
                placement="top-start"
                title="比赛名"
                width="200"
                trigger="hover"
                :content="scope.row.competitions.map(competition=>competition.title).join('\n')">
                <span slot="reference">{{  scope.row.competitions?scope.row.competitions.length:0 }}</span>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination background layout="prev,pager,next" v-model="page" :page-size="pageSize" @current-change="pageChange" :total="totalNum"></el-pagination>
    <el-dialog :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form
            ref="elForm"
            :rules="rules"
            :model="formData"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="formData.password"
                show-password
                @keyup.enter.native="register"
              ></el-input>
            </el-form-item>
          </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading="saving" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyUserApi from "@/api/user";
import myaxios from "@/plugins/axios";
import { Form } from "element-ui";
@Component({})
export default class UserList extends Vue {
    uploadUrl = process.env.VUE_APP_BASE_URL+MyUserApi.imgUploadUrl
  loading = true;
  lodingUserInfor = false;
  users = [];
  dialogVisible = false;
  saving = false;
  isSave = true;
  keyword = "";
  page = 1;
  pageSize = 5;
  totalNum = 1;
  async mounted() {
    let result = await MyUserApi.getTotalAPI(myaxios);
    if(result.success){
        this.totalNum = result.data;
    }
    this.pageChange(this.page)
    this.loading = false;
  }
  async pageChange(page){
    let result = await MyUserApi.findAllAPI(myaxios, this.pageSize, page,true);
    if (result.success) {
      this.users = result.data;
    }
  }
  async handleDelete(index,row){
    const result = await MyUserApi.deleteAPI(myaxios,row.id)
    if (result.success) {
      this.users.splice(index,1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
    } else {
      let mes = "删除失败";
      this.$message({
        message: result.data.message || mes,
        type: "error",
      });
    }
  }

  async handleEdit(index,row) {
    debugger
    this.dialogVisible = true;
    this.isSave = true;
    var objString = JSON.stringify(row);
    this.formData = JSON.parse(objString);
  }

  inheritAttr = false;
  formData = {
    id:"",
    username: "",
    role: "",
    relation: "",
    password: "",
    state: 0,
    realname: "",
    avatar:""
  };
  rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      // { min: 6, message: '长度需要大于6', trigger: 'blur' }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, message: "长度需要大于6", trigger: "blur" },
    ],
  };
  onOpen() {}
  onClose() {
    // (this.$refs["elForm"] as Form).resetFields();
  }
  close() {
    this.$emit("update:visible", false);
  }
  handleConfirm() {
    (this.$refs["elForm"] as Form).validate((valid: any) => {
      if (!valid) return;
      this.AddOrSave();
      this.close();
    });
  }
  async AddOrSave() {
    let saving = true;
    let result = null;
    if(this.isSave){
      result = await MyUserApi.updateAPI(myaxios, this.formData.id, this.formData);
    }
    if (result.success) {
      this.$message({
        message: "修改成功",
        type: "success",
      });
    } else {
      let mes = "修改失败";
      this.$message({
        message: result.data.message || mes,
        type: "error",
      });
    }
    saving = false;
    this.dialogVisible = false;

    //重新加载数据
    this.loading = true;
    const result2 = await MyUserApi.findAllAPI(myaxios, 5, 1,true);
    if (result2.success) {
      this.users = result2.data;
    }
      this.loading = false;
  }
    onUploadSuccess(response:any, file:File, fileList:File[]){
        // console.log(response)
        this.formData.avatar = response.filePath
    }
  get headers(){
      return this.$store.getters.getHeader
  }
}
</script>