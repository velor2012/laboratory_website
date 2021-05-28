<template>
  <div>
    <el-row>
<el-col :span="12">     
   <el-input
            v-model="keyword"
            size="mini"
            placeholder="输入关键字搜索"/></el-col>
  <el-col :span="12">      
    <el-button @click.native="OnClickAdd">添加</el-button>
  </el-col>



    </el-row>

    <el-table
      @row-click="clickRow"
      :data="papers"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="title" label="论文名"> </el-table-column>
      <el-table-column prop="conf" label="会议名"> </el-table-column>
      <el-table-column prop="link" width="100" label="论文文件">
      </el-table-column>
      <el-table-column prop="year" width="100" label="发表时间">
      </el-table-column>
      <el-table-column label="作者" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.author?scope.row.author.join(','):"" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关用户" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.users?scope.row.users.map(user=>user.realname).join(','):"" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关项目" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.projects?scope.row.projects.map(project=>project.title).join(','):"" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
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
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="论文名" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入论文名"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="会议名" prop="conf">
          <el-input
            v-model="formData.conf"
            placeholder="请输入会议名"
            clearable
            prefix-icon="el-icon-mobile"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="发表时间" prop="year">
          <el-date-picker
            type="year"
            v-model="formData.year"
            format="yyyy"
            value-format="yyyy"
            :style="{ width: '100%' }"
            placeholder="请选择发表时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-select
            v-model="formData.author"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择作者标签"
          >
            <el-option
              v-for="item in []"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关用户" prop="users">
          <el-select
            v-model="users_array"
            multiple
            filterable
            default-first-option
          >
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.realname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="论文文件" prop="link">
          <el-row justify="space-around" type="flex">
            <el-input
              disabled
              v-model="formData.link"
              clearable
              :style="{ width: '100%', paddingRight: '1em' }"
            >
            </el-input>
            <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :headers="headers"
            multiple
            :on-success="onUploadSuccess"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-row>
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
import MyPaperApi from "@/api/paper";
import myaxios from "@/plugins/axios";
import { Form } from "element-ui";
import MyUserAPI from "@/api/user";
@Component({})
export default class PaperList extends Vue {
    uploadUrl = process.env.VUE_APP_BASE_URL+MyPaperApi.uploadPaperUrl
  loading = true;
  lodingUserInfor = false;
  papers = [];
  users = [];
  users_array = []
  dialogVisible = false;
  saving = false;
  author_str = "";
  isSave = true;
  oldusers = [];
  keyword = "";
  page = 1;
  pageSize = 5;
  totalNum = 1;
  async mounted() {
    let result = await MyPaperApi.getTotalAPI(myaxios);
    if(result.success){
        this.totalNum = result.data;
    }
    this.pageChange(this.page)
    this.loading = false;
  }
  async pageChange(page){
    let result = await MyPaperApi.findAllAPI(myaxios, this.pageSize, page);
    if (result.success) {
      this.papers = result.data;
    }
  }
  async handleDelete(index,row){
    debugger
    const result = await MyPaperApi.deleteAPI(myaxios,row.id)
    if (result.success) {
      this.papers.splice(index,1);
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
  async OnClickAdd(){
    this.isSave = false;
    this.dialogVisible = true;
    this.resetFormdata()
    this.oldusers = [];
    this.users_array = []
    if (this.users.length == 0) {
      this.lodingUserInfor = true;
      const result = await MyUserAPI.findAllUserNameApi(myaxios);
      if (result.success) {
        this.users = result.data;
      }
      this.lodingUserInfor = false;
    }
  }
  async clickRow(row: any, column: any, event: any) {
    this.dialogVisible = true;
    this.isSave = true;
    var objString = JSON.stringify(row);
    this.formData = JSON.parse(objString);
    // this.formData = row;
    this.oldusers = row.users;
    this.users_array = row.users.map((user: any)=>user.id)
    if (this.users.length == 0) {
      this.lodingUserInfor = true;
      const result = await MyUserAPI.findAllUserNameApi(myaxios);
      if (result.success) {
        this.users = result.data;
      }
      this.lodingUserInfor = false;
    }
  }

  inheritAttr = false;
  formData = {
    id: "",
    title: undefined,
    conf: undefined,
    year: null,
    author: [],
    users: [] as any[],
    link: undefined,
  };
  rules = {
    title: [
      {
        required: true,
        message: "请输入论文名",
        trigger: "blur",
      },
    ],
    conf: [
      {
        required: true,
        message: "请输入会议名",
        trigger: "blur",
      },
    ],
    year: [
      {
        required: true,
        message: "请选择日期选择发表时间",
        trigger: "change",
      },
    ],
    author: [
      {
        required: true,
        type: "array",
        message: "请至少选择一个作者",
        trigger: "change",
      },
    ],
    link: [
      {
        required: true,
        message: "",
        trigger: "blur",
      },
    ],
  };
  onOpen() {}
  onClose() {
    // (this.$refs["elForm"] as Form).resetFields();
    this.oldusers = [];
    this.users_array = [];
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
    this.formData.users = this.users_array.map((id) => {return {id:id}});
    let f = { oldusers: this.oldusers, ...this.formData };
    let result = null;
    if(this.isSave){
      result = await MyPaperApi.updateAPI(myaxios, this.formData.id, f);
    }else{
      let {id,...f_} = this.formData
      result = await MyPaperApi.createAPI(myaxios,f_)
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
    const result2 = await MyPaperApi.findAllAPI(myaxios, this.pageSize, this.page);
    if (result2.success) {
      this.papers = result2.data;
    }
      this.loading = false;
  }
    onUploadSuccess(response:any, file:File, fileList:File[]){
        // console.log(response)
        this.formData.link = response.filePath
    }
  get headers(){
      return this.$store.getters.getHeader
  }
  resetFormdata(){
    this.formData = {
      id: "",
      title: undefined,
      conf: undefined,
      year: null,
      author: [],
      users: [] as any[],
      link: undefined,
    };
  }
}
</script>