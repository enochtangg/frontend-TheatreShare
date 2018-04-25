<template>
  <div class="container">
    <md-card>
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
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        alert(this.username)
        alert(this.password)
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
  }
</style>
