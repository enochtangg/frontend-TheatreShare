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

  export default {
    name: "dashboard",

    data() {
      return {
        theatres: [],
        socket: null
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
        // Join room
        this.socket.send(JSON.stringify({
          "command": "join",
          "theatre": theatre.id
        }));
        this.$router.push({
          name: 'Theatre',
          params: {
            theatre: theatre,
            socket: this.socket
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

      // Initial connection to backend websocket
      // Correctly decide between ws:// and wss://
      let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
      let ws_path = ws_scheme + '://localhost:8000' + "/chat/stream/";
      console.log("Connecting to " + ws_path);
      const ReconnectingWebSocket = require('reconnecting-websocket');
      this.socket = new ReconnectingWebSocket(ws_path);

      // Helpful debugging
      this.socket.onopen = function () {
        console.log("Connected to chat socket");
      };
      this.socket.onclose = function () {
        console.log("Disconnected from chat socket");
      }
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
