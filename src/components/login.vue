<template>
  <div class="container">
    <md-card class="login-card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">TheatreShare Login</div>
          <div class="md-subhead">Enter your login credentials to view dashboard</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label>Username</label>
          <md-input v-model="username" type="username"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised" @click="login">Login</md-button>
      </md-card-actions>
    </md-card>
    <div class="alert alert-danger" v-if="error" style="color: #e74c3c">{{ error }}</div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "login",

    data() {
      return {
        username: '',
        password: '',
        error: false
      }
    },

    methods: {
      login() {
        axios.post('http://localhost:8000/get-token/', {username: this.username, password: this.password})
          .then(response => this.loginSuccessful(response))
          .catch(() => this.loginFailed())
      },

      loginSuccessful(res) {
        if (!res.data.token) {
          this.loginFailed();
          return
        }
        else {
          localStorage.token = res.data.token;
          this.error = false;
          this.$router.replace(this.$route.query.redirect || 'dashboard/')
        }
      },

      loginFailed() {
        this.error = 'Login Failed. Please check credentials and try again!';
        delete localStorage.token
      }
    },
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
  }

  .login-card {
    margin-top: 5%;
  }
</style>

