<template>
<div>
  <el-row  align="middle" justify="center" type="flex" style="alignItems: center">
    <el-col :span="6" >
      <el-avatar :size="100" :src="current_user.avatar"></el-avatar>
    </el-col>
    <el-col :span="18">
    <el-form
      ref="current_user"
      :model="current_user"
      label-width="70px"
      v-loading="loading"
    >

      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入新密码"
          v-model="current_user.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
          <el-row justify="space-around" type="flex">
            <el-input
              disabled
              v-model="current_user.avatar"
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

      <el-form-item label-width="0">
        <el-button round type="primary" @click="save">保存修改</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>

    <el-row style="marginTop:3em"><span style="fontWeight: bold">论文</span></el-row>
    <el-table
      :data="current_user.papers"
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
    </el-table>

    <el-row style="marginTop:3em"><span style="fontWeight: bold">项目</span></el-row>
    <el-table
      :data="current_user.projects"
      style="width: 100%"
      v-loading="loading"
    >
    <el-table-column prop="title" label="项目名"> </el-table-column>
      <el-table-column prop="abstract" label="简介"> </el-table-column>
      <el-table-column prop="link" width="100" label="相关文件"/>
      <el-table-column prop="tags" width="100" label="标签"/>
      <el-table-column label="相关人员" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.participants?scope.row.participants.join(','):"" }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="marginTop:3em"><span style="fontWeight: bold">比赛</span></el-row>
    <el-table
       title="比赛"
      :data="current_user.competitions"
      style="width: 100%;marginTop:20px"
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
    </el-table>

    <el-row style="marginTop:3em"><span style="fontWeight: bold">专利</span></el-row>
    <el-table
      title="专利"
      :data="current_user.patents"
      style="width: 100%;marginTop:20px"
      v-loading="loading"
    >
    <el-table-column prop="patent_name" label="专利名"> </el-table-column>
      <el-table-column prop="publish_name" label="发表者"> </el-table-column>
      <el-table-column prop="application_class" label="所属类别"/>
      <el-table-column prop="authorized_time" width="100" label="生效时间"/>
      <el-table-column prop="authorized_id" width="100" label="专利号"/>
      <el-table-column prop="institution" width="100" label="不知道是啥"/>
      <el-table-column label="相关人员" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{  scope.row.invent_name?scope.row.invent_name.join(','):"" }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MyUserAPI from '@/api/user'
import { result } from 'lodash';
import myaxios from '@/plugins/axios';
@Component({})
export default class UserPage extends Vue{
    uploadUrl = process.env.VUE_APP_BASE_URL+MyUserAPI.imgUploadUrl
    loading = true
    userId = ''
    adminUser = 3
    current_user:any ={}
    users = [];
    users_array = []
    async mounted(){
        this.userId = this.$route.params.id
        if(this.userId == undefined){
            console.log('undefined')
        }
        console.log(this.userId)
        const result = await MyUserAPI.findOneAPI(myaxios,this.userId,true)
        if(result.success){
          this.current_user = result.data
        }

        this.loading=false
    }
    async save(){
      debugger
      const result = await MyUserAPI.updateAPI(myaxios,this.current_user.id,this.current_user)
      if(result.success){
        this.$message({type:"success",message:"修改成功"})
      }else{
        this.$message({type:"error",message:"修改失败"})
      }
    }
      get headers(){
      return this.$store.getters.getHeader
  }

    onUploadSuccess(response:any, file:File, fileList:File[]){
        // console.log(response)
        this.current_user.avatar = response.filePath
    }
}
</script>
<style scoped="scoped">
.bform{
  width: 40%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
