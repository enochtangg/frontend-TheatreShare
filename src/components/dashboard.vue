<template>
  <div>
    <nav-bar></nav-bar>
    <md-card class="auditorium-card" v-for="theatre in theatres" v-bind:data="theatre">
      <md-card-media-cover>
        <md-card-media>
          <img src="../assets/auditorium.png">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">{{ theatre.name }}</span>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-raised" @click="enterTheatre(theatre)">Enter Auditorium</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
</template>

<script>
  import {HTTP} from '../axios-backend/vue-axios/axios';
  import NavBar from './nav.vue'

  export default {
    name: "dashboard",

    data() {
      return {
        theatres: [],
      }
    },
    methods: {
      getTheatres() {
        HTTP.get('theatres/', {
          headers: {
            'Authorization': 'Token ' + localStorage.token
          },
        })
          .then(response => this.theatres = response.data)
          .catch(() => this.getTheatreFailed());
      },
      getTheatreFailed() {
        alert('Could not query API for theatres')
      },
      enterTheatre(theatre) {
        this.$router.push({
          name: 'Theatre',
          params: {
            theatre: theatre
          }
        });
      }
    },
    mounted() {
      this.getTheatres()
    },
    components: {
      NavBar: NavBar
    }
  }
</script>

<style scoped>
  .auditorium-card {
    width: 25%;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
