<template>
<el-container class="main_pannel">
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{userRealNmae}}</span>
  </el-header>
  <el-container class="center_container">
    <el-aside width="200px">
      <el-menu router>
          <el-menu-item-group title="成果管理">
            <el-menu-item index="/paperlist">论文管理</el-menu-item>
            <el-menu-item index="/projectlist">项目管理</el-menu-item>
            <el-menu-item index="/patentlist">专利管理</el-menu-item>
            <el-menu-item index="/competitionlist">比赛管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="系统管理">
            <el-menu-item index="/userlist">用户管理</el-menu-item>
            <el-menu-item @click="toCurrentUser">个人信息</el-menu-item>
          </el-menu-item-group>
      </el-menu>
    </el-aside>

      
      <el-main>
        <router-view def/>
      </el-main>
  </el-container>
  <!-- <el-footer>Footer</el-footer> -->
</el-container>
</template>
<style scoped="scoped">
  .el-header {
    background-color: rgb(42, 172, 141);
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .main_pannel{
    width: 100vw;
    height: 100vh;
  }
 .center_container{
    height: 80%;
  }
  .el-header{
    height: 10%;
  }
  .el-footer{
    height: 10%;
  }
</style>

<script lange="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
@Component({
})
export default class HomePage extends Vue {
      logout(){
        this.$cookies.remove('login')
        this.$cookies.remove('user')
        this.$cookies.remove('token')
        this.$store.commit('logout')
        this.$store.commit('setToken',null)
        this.$store.commit('setUser',null)
        this.$router.push('/login')
      }
      toCurrentUser(){
        this.$router.push(`/user/${this.$store.getters.getUser.id}`)
      }
      get userRealNmae(){
        return _.get(this.$store.getters.getUser,'realname')
      }
  };
</script>