<template>
  <div class="login-register">
    <el-container class="contain" v-loading="loading">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-show="isLogin">
          <div class="btitle">账户登录</div>
          <el-form
            class="bform"
            ref="form_login"
            :rules="rules2"
            :model="form_login"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form_login.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="form_login.password"
                show-password
                 @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button round type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="big-contain" v-show="!isLogin">
          <div class="btitle">创建账户</div>
          <el-form
            class="bform"
            ref="form_register"
            :rules="rules"
            :model="form_register"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form_register.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
              <el-input
                placeholder="realname"
                v-model="form_register.realname"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="relation">
              <el-radio-group
                @change="relationChange"
                v-model="form_register.relation"
              >
                <el-radio-button label="学生"></el-radio-button>
                <el-radio-button label="老师"></el-radio-button>
                <el-radio-button label="研究员"></el-radio-button>
                <el-radio-button label="顾问"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="学历"
              v-if="this.form_register.relation == '学生'"
            >
              <el-radio-group v-model="form_register.stu.degree">
                <el-radio-button label="博士"></el-radio-button>
                <el-radio-button label="专硕"></el-radio-button>
                <el-radio-button label="学硕"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="是否毕业"
              v-if="this.form_register.relation == '学生'"
            >
              <el-radio-group v-model="form_register.stu.state">
                <el-radio-button label="在读"></el-radio-button>
                <el-radio-button label="毕业"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="入学年份"
              v-if="this.form_register.relation == '学生'"
            >
              <el-date-picker
                v-model="form_register.stu.enroll_time"
                type="year"
                value-format="yyyy"
                format="yyyy 年"
                placeholder="选择年"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="form_register.password"
                show-password
                @keyup.enter.native="register"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button round type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，加入视频项目组</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Form } from "element-ui";
import myaxios from "@/plugins/axios";
import UserApi from "@/api/user";
import _ from "lodash";
@Component({
  components: {
    HelloWorld,
  },
})
export default class LoginAndRegisterPage extends Vue {
  name = "login-register";
  loading = false;
  isLogin = true;
  emailError = false;
  passwordError = false;
  existed = false;
  role = 3;
  relation = 4;
  relations = ['payload','老师','顾问','研究员','学生']
  form_login = {
    username: "",
    password: "",
  };
  form_register = {
    username: "",
    role: "",
    relation: "",
    password: "",
    state: 0,
    realname: "",
    stu: {
      state: "在读",
      degree: "",
      enroll_time: "2016",
      stu_name: "",
    },
    teacher: {
      teacher_name: "",
    },
    researcher: {
      researcher_name: "",
    },
    adviser: {
      adviser_name: "",
    },
  };
  rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      // { min: 6, message: '长度需要大于6', trigger: 'blur' }
    ],
    realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    role: [{ required: true, message: "请选择", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, message: "长度需要大于6", trigger: "blur" },
    ],
  };
  rules2 = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  changeType() {
    this.isLogin = !this.isLogin;
    (this.$refs["form_register"] as Form).resetFields();
    (this.$refs["form_login"] as Form).resetFields();
    (this.$refs["form_register"] as Form).clearValidate();
  }
  async login() {
    if (this.validate("form_login")) {
      let error = false;
      this.loading = true;
      const result = await UserApi.loginAPI(myaxios, this.form_login)
      if (result.success) {
        this.$cookies.set("login", true,"1d");
        this.$store.commit("login");
        this.$message({
          message: "登陆成功",
          type: "success",
        });
        if (_.isEmpty(result.data.access_token)) {
          this.$message({
            message: "服务器返回值有误",
            type: "error",
          });
          this.loading = false;
          return false;
        }
        this.$store.commit("setToken", result.data.access_token);
        this.$cookies.set("token", result.data.access_token,"1d");
        const result2 = await UserApi.getCurrentUser(myaxios);
        if (result2.success) {
          this.$store.commit("setUser", result2.data);
          this.$cookies.set("user", JSON.stringify(result2.data),"1d");
        } else {
          this.$message({
            message: "找不到用户,无法设置token",
            type: "error",
          });
          error = true;
        }
      } else {
        const e = result.data
        let message = '登陆失败'
        if(e.message && (e.message == 'Unauthorized' || e.statusCode == 401)){
          message = '用户名或密码错误'
        }
        this.$message({
          message: message,
          type: "error",
        });
        error = true;
      }
      this.loading = false;
      if(!error) this.$router.push('/')
    }
  }
  async register() {
    if (this.validate("form_register")) {
      this.loading = true;
      // TODO 完成注册以及跳转;
      var { role: any, relation: any, ...other } = this.form_register;
      var role = this.role;
      var relation = this.relation;
      let b = { role, relation, ...other };
      const result = await UserApi.createAPI(myaxios, b);
      debugger;
      if (result.success) {
        this.$message({
          message: "注册成功",
          type: "success",
        });
        this.isLogin = true;
      }
      this.loading = false;
    }
  }
  relationChange(labelName: string) {
    return this.relation = this.relations.indexOf(labelName)
  }
  validate(formName: string): boolean {
    let result = true;
    const form = this.$refs[formName] as Form;
    form.validate((valid) => {
      if (valid) {
        result = true;
      } else {
        console.log("error submit!!");
        result = false;
      }
    });
    return result;
  }
  @Watch("form_register.realname", { immediate: false })
  changeName(newVal: string, oldVal: string) {
    this.form_register.stu.stu_name = newVal;
    this.form_register.adviser.adviser_name = newVal;
    this.form_register.teacher.teacher_name = newVal;
    this.form_register.researcher.researcher_name = newVal;
  }
}
</script>

<style scoped="scoped">
.login-register {
  width: 100vw;
  height: 100vh;
  background-image: url(https://cdn.jsdelivr.net/gh/velor2012/imageHosting/esther-tuttle-rH248bCemLs-unsplash.jpg);
}
.contain {
  width: 60%;
  height: 80%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  /* height: 100%; */
  padding: 2em 10px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
}
.small-box {
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>