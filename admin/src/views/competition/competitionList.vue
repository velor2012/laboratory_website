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
      :data="competitions"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="title" label="比赛名"> </el-table-column>
      <el-table-column prop="abstract" label="简介"> </el-table-column>
      <el-table-column prop="link" width="100" label="相关文件"/>
      <el-table-column prop="tags" width="100" label="标签"/>
      <el-table-column label="相关人员" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.participants?scope.row.participants.join(','):"" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关用户" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.users?scope.row.users.map(user=>user.realname).join(','):"" }}</span>
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
        <el-form-item label="项目名" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入项目名"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="简介" prop="abstract">
          <el-input
            v-model="formData.abstract"
            placeholder="请输入简介"
            clearable
            prefix-icon="el-icon-mobile"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="formData.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入标签"
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
        <el-form-item label="相关人员" prop="participants">
          <el-select
            v-model="formData.participants"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入参与项目的相关人员"
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
        <el-form-item label="相关文件" prop="link">
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
import MyCompetitionApi from "@/api/competition";
import myaxios from "@/plugins/axios";
import { Form } from "element-ui";
import { str2array, array2str } from "@/assets/filters";
import MyUserAPI from "@/api/user";
@Component({})
export default class CompetitionList extends Vue {
    uploadUrl = process.env.VUE_APP_BASE_URL+MyCompetitionApi.uploadCompetitionUrl
  loading = true;
  lodingUserInfor = false;
  competitions = [];
  users = [];
  users_array = []
  dialogVisible = false;
  saving = false;
  isSave = true;
  oldusers = [];
  keyword = "";
page = 1;
  pageSize = 5;
  totalNum = 1;
  async mounted() {
    let result = await MyCompetitionApi.getTotalAPI(myaxios);
    if(result.success){
        this.totalNum = result.data;
    }
    this.pageChange(this.page)
    this.loading = false;
  }
    async pageChange(page){
    let result = await MyCompetitionApi.findAllAPI(myaxios, this.pageSize, page);
    if (result.success) {
      this.competitions = result.data;
    }
  }
  async handleDelete(index,row){
    debugger
    const result = await MyCompetitionApi.deleteAPI(myaxios,row.id)
    if (result.success) {
      this.competitions.splice(index,1);
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
    this.resetFormData()
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
  resetFormData(){
    this.formData = {
    id: "",
    title: undefined,
    link: undefined,
    tags: [],
    participants:[],
    users: [] as any[],
    };
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
    link: undefined,
    tags: [],
    participants:[],
    users: [] as any[],
  };
  rules = {
    title: [
      {
        required: true,
        message: "请输入项目名",
        trigger: "blur",
      },
    ],
    abstract: [
      {
        required: true,
        message: "请输入简介",
        trigger: "blur",
      },
    ],
    tags: [
      {
        required: true,
        type: "array",
        message: "请至少选择一个标签",
        trigger: "change",
      },
    ],
  };
  authorOptions = [
    {
      label: "选项一",
      value: 1,
    },
    {
      label: "选项二",
      value: 2,
    },
  ];
  usersOptions = [
    {
      label: "选项一",
      value: 1,
    },
    {
      label: "选项二",
      value: 2,
    },
  ];

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
      result = await MyCompetitionApi.updateAPI(myaxios, this.formData.id, f);
    }else{
      let {id,...f_} = this.formData
      result = await MyCompetitionApi.createAPI(myaxios,f_)
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
    const result2 = await MyCompetitionApi.findAllAPI(myaxios, 5, 1);
    if (result2.success) {
      this.competitions = result2.data;
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
}
</script>