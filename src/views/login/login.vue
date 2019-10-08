<template>
  <div class="login">
    <div class="login-warp">
      <div class="loginlogo">
        <img src="./logo_index.png" alt />
      </div>
      <!-- el-form: 管理所有表单元素的父容器  ref: vue 中提供的操作 dom 的方式 model: 表单元素的数据源 label-width： 描述文本的宽度 -->
      <!-- 在父盒子设置一个rules检测数据 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- el-form-item：表单域 label: 当前选项的描述文字 -->
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 一行 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form.code" placeholder="请输入验证码" :rules="rules"></el-input>
            </el-col>
            <!-- 需要使用offset 占用2分笔录 -->
            <el-col :span="10" :offset="2">
              <el-button
                class="loginbtn"
                @click="getnum"
                v-model="codetime"
              >{{time?`${codetime}S后获取`:'获取验证码'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="read">
          <!-- 绑定多选框的默认值 -->
          <el-checkbox v-model="form.read" name="type">
            我已阅读并
            <a href="#" class="textcolor" @click="openmsguse1" plain >同意用户协议</a>和
            <a href="#" class="textcolor" @click="openmsguse2" plain>隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item prop="mobile">
          <!-- 此处需要传入一个form对应的实参   -->
          <el-button size="medium" class="loginbtn" @click="login('form')" :loading="isload">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {

      form: {
        phone: '',
        code: '',
        // 设置阅读默认值
        read: false
      },

      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号码必须是11位数字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入收到的验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证是6位数', trigger: 'blur' }
        ],
        read: [
          { required: true, message: '请先阅读用户协议', trigger: 'change' },
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      },
      isload: false,
      codetime: 5,
      time: null
    }
  },
  methods: {

    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   设置登录成功加载
          this.isload = true
          axios({
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations', // 请求的地址
            method: 'post', // 请求的方式
            data: this.form
          }).then(res => {
            //   设置路由切换
            this.$router.push('/home')
            this.$message({
              message: '登录成功',
              type: 'success'

            })
            this.isload = false
          })
            .catch(err => {
              console.log(err)
              this.$message.error('手机号或者验证码错误')
              this.isload = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getnum () {
      // 设定一个计时器
      this.time = setInterval(() => {
        //   事件自减
        this.codetime--
        if (this.codetime <= 0) {
          clearInterval(this.time)
          //   重设定时器等于10
          this.codetime = 5
          // 重新设置定时器为null
          this.time = null
        }
      }, 1000)
    },
    openmsguse1 () {
      const h = this.$createElement

      this.$notify({
        title: '用户协议',
        message: h('i', { style: 'color: teal' }, '感谢使用HM头条！使用HM头条前，请您仔细阅读《HM 用户使用协议》。本协议是您在使用“HM”服务时与HM集团有限公司（以下简称“HM协议”）所订立的协议。如您不同意本协议条款或和彩云对其进行的修改，您可以主动取消和彩云提供的服务；您一旦使用和彩云提供的服务，即视为您已了解并完全同意本使用协议中服务条款各项内容，包括和彩云对服务条款所做的任何修改，并成为中国移动和彩云的用户（以下简称“用户”）。')
      })
    },
    openmsguse2 () {
      const h = this.$createElement

      this.$notify({
        title: '隐私条款',
        message: h('i', { style: 'color: teal' }, '为了您的账户安全,请仔细阅读本次隐私条款')
      })
    }
  }

}
</script>

<style lang="less" scoped >
.login {
  // 背景图
  background: url("./login_bg.jpg");
  background-size: 100% 100%;
  height: 100%;
  // 弹性布局
  display: flex;
  // 居中显示
  justify-content: center;
  align-items: center;
}
.login-warp {
  padding: 30px;
  min-width: 300px;
  background-color: #ccc;
  .loginlogo {
    text-align: center;
    img {
      width: 150px;
      margin-bottom: 20px;
    }
  }
  .loginbtn {
    width: 100%;
  }
}
.textcolor {
  color: black;
}
</style>
