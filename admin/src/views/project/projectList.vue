<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-input v-model="keyword" size="mini" placeholder="输入关键字搜索"
      /></el-col>
      <el-col :span="12">
        <el-button @click.native="OnClickAdd">添加</el-button>
      </el-col>
    </el-row>

    <el-table
      @row-click="clickRow"
      :data="projects"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="fund_name_cn" label="基金会中文名">
      </el-table-column>
      <el-table-column prop="fund_name_en" label="基金会英文名">
      </el-table-column>
      <el-table-column prop="title" label="项目名"> </el-table-column>
      <el-table-column prop="abstract" label="简介"> </el-table-column>
      <el-table-column prop="start_date" label="开始时间"> </el-table-column>
      <el-table-column prop="end_date" label="结束时间"> </el-table-column>
      <el-table-column prop="link" width="100" label="相关文件" />
      <el-table-column prop="tags" width="100" label="标签" />
      <el-table-column label="相关人员">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.participants ? scope.row.participants.join(",") : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关会议">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.papers | getPapersConf
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关用户">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.users
              ? scope.row.users.map((user) => user.realname).join(",")
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
        <el-form-item label="基金会中文名" prop="fund_name_cn">
          <el-input
            v-model="formData.fund_name_cn"
            placeholder="请输入基金会中文名"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="基金会英文名" prop="fund_name_en">
          <el-input
            v-model="formData.fund_name_en"
            placeholder="请输入基金会英文名"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
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
        <el-form-item label="项目开始时间" prop="start_date">
          <el-date-picker
            type="month"
            v-model="formData.start_date"
            format="yyyy-MM"
            value-format="yyyy-MM"
            :style="{ width: '100%' }"
            placeholder="请选择项目开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目结束时间" prop="end_date">
          <el-date-picker
            type="month"
            v-model="formData.end_date"
            format="yyyy-MM"
            value-format="yyyy-MM"
            :style="{ width: '100%' }"
            placeholder="请选择项目结束时间"
            clearable
          ></el-date-picker>
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
        <el-form-item label="相关论文" prop="papers">
          <el-select
            v-model="papers_array"
            multiple
            filterable
            default-first-option
          >
            <el-option
              v-for="(item, index) in papers"
              :key="index"
              :label="item.title"
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
              :limit="1"
            >
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
import MyProjectApi from "@/api/project";
import myaxios from "@/plugins/axios";
import { Form } from "element-ui";
import MyUserAPI from "@/api/user";
import MyPaperAPI from "@/api/paper";
@Component({
  filters: {
    getPapersConf(papers: Array<any>) {
      return papers.map((paper) => {
        return paper.conf;
      }).join(',');
    },
  },
})
export default class ProjectList extends Vue {
  uploadUrl = process.env.VUE_APP_BASE_URL + MyProjectApi.uploadProjectUrl;
  loading = true;
  lodingUserInfor = false;
  projects = [];
  users = [];
  users_array = [];
  papers = [];
  papers_array = [];
  dialogVisible = false;
  saving = false;
  isSave = true;
  oldusers = [];
  oldpapers = [];
  keyword = "";
  page = 1;
  pageSize = 5;
  totalNum = 1;
  async mounted() {
    let result = await MyProjectApi.getTotalAPI(myaxios);
    if(result.success){
        this.totalNum = result.data;
    }
    this.pageChange(this.page)
    if (this.users.length == 0) {
      this.lodingUserInfor = true;
      result = await MyUserAPI.findAllUserNameApi(myaxios);
      if (result.success) {
        this.users = result.data;
      }
      const result2 = await MyPaperAPI.findAllPaperNameApi(myaxios);
      if (result.success) {
        this.papers = result2.data;
      }
      this.lodingUserInfor = false;
    }
    this.loading = false;
  }
  async handleDelete(index, row) {
    const result = await MyProjectApi.deleteAPI(myaxios, row.id);
    if (result.success) {
      this.projects.splice(index, 1);
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
  async OnClickAdd() {
    this.isSave = false;
    this.dialogVisible = true;
    this.resetFormData();
    this.oldusers = [];
    this.users_array = [];
  }
  async pageChange(page){
    let result = await MyProjectApi.findAllAPI(myaxios, this.pageSize, page);
    if (result.success) {
      this.projects = result.data;
    }
  }
  resetFormData() {
    this.formData = {
      id: "",
      start_date: "2019-03",
      end_date: "2020-03",
      fund_name_cn: "",
      fund_name_en: "",
      title: undefined,
      link: undefined,
      tags: [],
      participants: [],
      users: [] as any[],
      papers: [] as any[],
    };
  }
  async clickRow(row: any, column: any, event: any) {
    debugger;
    this.dialogVisible = true;
    this.isSave = true;
    var objString = JSON.stringify(row);
    this.formData = JSON.parse(objString);
    // this.formData = row;
    this.oldusers = row.users;
    this.users_array = row.users.map((user: any) => user.id);
    this.oldpapers = row.papers;
    this.papers_array = row.papers.map((paper: any) => paper.id);
  }

  inheritAttr = false;
  formData = {
    id: "",
    start_date: "2019-03",
    end_date: "2020-03",
    fund_name_cn: "",
    fund_name_en: "",
    title: undefined,
    link: undefined,
    tags: [],
    participants: [],
    users: [] as any[],
    papers: [] as any[],
  };
  rules = {
    title: [
      {
        required: true,
        message: "请输入项目名",
        trigger: "blur",
      },
    ],
    fund_name_cn: [
      {
        required: true,
        message: "请输入基金会中文名",
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
    start_date: [
      {
        required: true,
        message: "请输入项目开始时间",
        trigger: "blur",
      },
    ],
    end_date: [
      {
        required: true,
        message: "请输入项目结束时间",
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
  onOpen() {}
  onClose() {
    // (this.$refs["elForm"] as Form).resetFields();
    this.oldusers = [];
    this.users_array = [];
    this.oldpapers = [];
    this.papers_array = [];
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
    this.formData.users = this.users_array.map((id) => {
      return { id: id };
    });
    this.formData.papers = this.papers_array.map((id) => {
      return { id: id };
    });
    let f = { oldusers: this.oldusers,oldpapers: this.oldpapers, ...this.formData };
    debugger
    let result = null;
    if (this.isSave) {
      result = await MyProjectApi.updateAPI(myaxios, this.formData.id, f);
    } else {
      let { id, ...f_ } = this.formData;
      result = await MyProjectApi.createAPI(myaxios, f_);
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
    const result2 = await MyProjectApi.findAllAPI(myaxios, this.pageSize, this.page);
    if (result2.success) {
      this.projects = result2.data;
    }
    this.loading = false;
  }
  onUploadSuccess(response: any, file: File, fileList: File[]) {
    // console.log(response)
    this.formData.link = response.filePath;
  }
  get headers() {
    return this.$store.getters.getHeader;
  }
}
</script>
