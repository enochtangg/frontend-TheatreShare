<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <md-card class="create-card">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Create a Theatre</div>
            <div class="md-subhead">Enter your theatre information to start a new auditorium to share with friends</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Auditorium Name</label>
            <md-input v-model="name" type="name"></md-input>
          </md-field>
          <md-field>
            <label>Youtube Link</label>
            <md-input v-model="url" type="url"></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised" @click="submit">Submit</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
  import NavBar from './navbar.vue'
  import axios from 'axios';

  export default {
    name: "create",
    components: {
      NavBar: NavBar
    },
    data() {
      return {
        name: '',
        url: ''
      }
    },
    methods: {
      submit() {
        let headers = {
          headers: {
            'Authorization': 'Token ' + localStorage.token,
            'Content-Type': 'application/json',
          }
        };
        let data = {
          name: this.name,
          youtube_url: this.url
        };
        axios.post('http://localhost:8000/theatres/', data, headers)
          .then(response => this.submitSuccessful(response))
          .catch(() => this.submitFailed())
      },
      submitSuccessful(res) {
        console.log(res)
      },
      submitFailed() {
        alert('Could not submit to API')
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: auto;
  }

  .create-card {
    margin-top: 5%;
  }
</style>
