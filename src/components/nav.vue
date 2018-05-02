<template>
  <md-toolbar class="md-accent" md-elevation="1">
    <h2 class="md-title" style="flex: 1">Dashboard</h2>
    <md-button @click="goHome"><i class="material-icons">home</i></md-button>
    <md-button @click="logout"><i class="material-icons">power_settings_new</i></md-button>
  </md-toolbar>
</template>

<script>
  export default {
    name: "nav",
    methods: {
      logout() {
        delete localStorage.token;
        this.$router.replace(this.$route.query.redirect || '/')
      },
      goHome() {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    }
  }
</script>

<style scoped>

</style>
