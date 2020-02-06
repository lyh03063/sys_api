<template>
  <div class="login-page-box">
    <div class="login-bgimg-box"></div>
    <div class="login-father-box" >
      <div class="login-box">
        <div class="login-user-img-box">
          <div class="login-user-img el-icon-s-custom"></div>
        </div>
        <h1>{{systemName}}登录</h1>
        <h2>管理员登录</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <div class>
              <el-input v-model="ruleForm.userName" placeholder="管理账户">
                <!-- <template slot="prepend">管理账户</template> -->
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="ruleForm.passWord" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员账户"));
      } else {
        callback(); //通过校验
      }
    };
    var validatepassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
     
      else {
        callback(); //通过校验
      }
    };

    return {
      systemName: PUB.systemName,
     

      ruleForm: {
        //表单数据.
        userName: "",
        passWord: ""
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        userName: [{ validator: validateuserName, trigger: "blur" }],
        passWord: [{ validator: validatepassWord, trigger: "blur" }]
      },
      userLog: {}
    };
  },

  methods: {
    async adminLogin() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _dataType: "admin",
          _systemId: PUB._systemId,
          findJson: {
            userName: this.ruleForm.userName,
            passWord: this.ruleForm.passWord
          }
        }
      }); 

      let userName = lodash.get(data, `doc.userName`);
      if (userName) {
        this.$message.success("登录成功");
        localStorage[PUB.keyIsLogin] = 1;
        localStorage[PUB.keyLoginUser] = userName; //存储用户名
        PUB.userId = userName;
      

        await util.timeout(500); //延迟
 
        if (PUB.goUrlAfterLogin) {
          //Q1:{登录后要跳转的地址}存在
          this.$router.push({ path: PUB.goUrlAfterLogin });
        } else {
          //Q2:{登录后要跳转的地址}不存在
          this.$router.push({ path: "/listhome" });
        }
      } else {
        this.$message.error("用户名或密码错误");
      }
    },
    submitForm(formName) {

      this.$refs.ruleForm.validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果validate为真执行以下放方法
          this.adminLogin();
        }
      });
    }
  },
  created() {
    //------------如果已经登录------------
    if (localStorage[PUB.keyIsLogin] == 1) {
     
      setTimeout(() => {
        this.$router.push({ path: "/listHome" });
      }, 10);
      //跳转到后台首页
    }
    
  },
  beforeMount() {
  },
  mounted() {
  }
};
</script>


<style lang="scss" >
.login-page-box {
  background-color: rgb(147, 222, 254);
  height: 100%;
  width: 100%;
}
body,
html {
  height: 100%;

}
.login-box {
  width: 100%;
  padding: 0 40px 40px 40px;

  h1 {
    padding: 10px 20px 10px 5px;
    font-size: 24px;
    font-weight: 400;
  }
  h2 {
    margin: 10px 20px 10px 5px;
    padding-left: 5px;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
  }
}

.login-father-box {
  /*弹窗绝对居中*/
  width: 400px;
  height: 350px;
  // border: 1px solid #000;
  background: #ffffff;
  margin-left: -250px;
  margin-top: -200px;
  position: fixed;
  top: 50%;
  left: 75%;
  box-shadow: 10px #ffffff;
  border-radius: 10px;
}
.login-user-img-box {
  margin-left: 33%;
  width: 120px;
  height: 120px;
  background-color: rgb(147, 222, 254);
  margin-top: -60px;
  border-radius: 50%;
  padding: 10px;
}
.login-user-img {
  height: 100px;
  width: 100px;
  text-align: center;
  line-height: 100px;
  border-radius: 50px;
  background-color: #ffffff;
  font-size: 50px;
  color: rgb(147, 222, 254);
}
.login-bgimg-box {
  position: fixed;
  top: 28%;
  left: 15%;
  height: 440px;
  width: 500px;
  // background-color: #ffffff;
  background-image: url("http://demo.demohuo.top/modals/40/4065/demo/images/login-img.png");
}
</style>
