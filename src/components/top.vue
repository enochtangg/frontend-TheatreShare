<template>
  <md-toolbar class="md-accent" md-elevation="1">
    <h2 class="md-title" style="flex: 1">Home</h2>
    <md-button @click="logout"><i class="material-icons">power_settings_new</i></md-button>
  </md-toolbar>
</template>

<script>
  export default {
    name: "top",
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
