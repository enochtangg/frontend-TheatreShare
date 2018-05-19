<template>
  <div>
    <top></top>
    <md-card class="create-card">
      <md-card-header>
        <div class="md-title">Dashboard</div>
      </md-card-header>

      <md-card-content>
        <p class="md-subheading">Listed below are all your theatre rooms you are active in</p>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised" @click="createTheatre">Create new theatre room</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="auditorium-card" v-for="theatre in theatres" :key="theatre.id">
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
  import Top from './top.vue'
  import axios from 'axios';
  import socket from '../sockets/socket'

  export default {
    name: "dashboard",

    data() {
      return {
        theatres: []
      }
    },
    methods: {
      getTheatres() {
        axios.get('http://localhost:8000/theatres/', {
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
      },
      createTheatre() {
        this.$router.push({
          name: 'Create'
        });
      }
    },
    mounted() {
      this.getTheatres();
    },
    components: {
      Top: Top
    }
  }
</script>

<style scoped>
  .auditorium-card {
    width: 23%;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }

  .create-card {
    width: 95%;
    margin: auto;
    margin-top: 15px;
  }
</style>
