<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

    <div class="title-container">
      <h3 class="title">{{ $t('login.title') }}</h3>
      <lang-select class="set-language"/>
    </div>

    <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
      <el-input
        v-model="loginForm.username"
        :placeholder="$t('login.username')"
        name="username"
        type="text"
        auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
      <el-input
        :type="passwordType"
        v-model="loginForm.password"
        :placeholder="$t('login.password')"
        name="password"
        auto-complete="on"
        @keyup.enter.native="handleLogin"/>
      <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
    </el-form-item>
    <div>
      <a href="javascript: void(0)" style="color: white" @click="">{{ $t('login.toSignUp') }}</a>
      <a href="javascript: void(0)" style="color: white">{{ $t('login.forgetPassword') }}</a>
    </div>
    <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
               @click.native.prevent="handleLogin">{{ $t('login.logIn') }}
    </el-button>

    <el-button class="thirdparty-button" type="primary"
               @click="showDialog=true">{{ $t('login.thirdparty') }}</el-button>
  </el-form>
</template>

<script>
// import openWindow from '@/utils/openWindow'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
export default {
  name: 'LoginForm',
  components: { LangSelect, SocialSign },
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
