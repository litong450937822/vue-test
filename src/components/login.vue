<template>
  <div class="backlogin">
    <div class="login_box">
      <div class="title">后台登录</div>
      <div>
        <input type="text" placeholder="手机号/用户名" v-model="username" class="myinput"/>
      </div>
      <div>
        <input type="password" placeholder="口令" v-model="password" class="myinput"/>
      </div>
      <div class="login_other">
        <a href="javascript:;">找回密码</a>
        <input type="checkbox" v-model="rememberMe"/><label>记住我</label>
      </div>
      <button :disabled="disablebtn" @click="login" class="login">登录</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/axios/axios-init.js'
  import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    name: "login",
    data() {
      return {
        username: "admin", /* 先预存测试值，以免手动输入 */
        password: "admin123",
        rememberMe: false,
        disablebtn: false
      }
    },
    validations: {
      user: {
        username: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(20)
        },
        password: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(20)
        }
      }
    },
    methods: {
      login() {

        this.disablebtn = true;
        this.$axios.post("/api/u/login", {
          username: this.username,
          rememberMe: this.rememberMe,
          password: this.password
        }).then((result) => {
          // console.log(result.data.data[0].nickname);
          this.disablebtn = false;
          this.$store.commit('setUsername', this.username);
          this.$store.commit('setNickname', result.data.data[0].nickname);
          console.log(sessionStorage.getItem(`nickname`));
          if (result.data.code === 0) {
            this.$router.push("/helloWorld");
          }
        }).catch((error) => {
          console.log(error);
          this.disablebtn = false;
        });
      }
    }
  }
</script>

<style scoped>
  .login_box {
    width: 320px;
    margin: 50px auto;
  }

  .login_box .title {
    color: #273444;
    font-size: 1.5em;
    text-align: center;
    margin: 0 0 20px 0;
  }

  .login_box .myinput {
    width: 100%;
    border: 1px solid #cad3d3;
    height: 40px;
    line-height: 40px;
    margin: 5px 0 10px;
    border-radius: 3px;
    padding: 0 10px;
    outline: none;
    box-sizing: border-box;
  }

  .login_box .myinput:focus {
    border: 1px solid #4289dc;
  }

  .login_other {
    overflow: hidden;
  }

  .login_other a {
    float: right;
    color: #727f8f;
  }

  .login_other a:hover {
    color: #273444;
  }

  .login_other input, .login_other label {
    float: left;
    color: #727f8f;
  }

  .login_other input {
    margin: 4px 5px 0 0;
  }

  .login {
    box-sizing: border-box;
    border: 0;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background: #4187db;
    font-size: 16px;
    border-radius: 3px;
    margin-right: 40px;
    transition: all 0.5s ease;
    cursor: pointer;
    outline: none;
    color: #fff;
    margin-top: 15px;
  }

  .login:hover {
    background: #2668b5;
  }

  .login[disabled] {
    opacity: .8;
  }

  .login[disabled]:hover {
    background: #4187db;
  }

  @media only screen and (max-width: 768px) {
    .login_box {
      width: 280px;
      margin: 50px auto;
    }
  }
</style>
