<template>
  <div>
    <top></top>
    <div class="wrapper">
      <div class="title">
        <h1>{{theatre.name}}</h1>
      </div>
      <youtube :video-id="videoId" @ready="ready" player-height="4000" class="video-player"
               :player-vars="{controls: 0}"></youtube>
      <div class="chat-box">
        <div class="output-box">

        </div>

        <div class="input-box">
          <md-field>
            <label>Message here</label>
            <md-textarea v-model="textarea"></md-textarea>
          </md-field>
        </div>
        <md-button class="md-raised send-button" @click="sendMessage"><i class="material-icons">send</i></md-button>

      </div>
      <md-button class="md-raised" @click="pauseVideo">Pause</md-button>
      <md-button class="md-raised" @click="playVideo">Play</md-button>
      <md-button class="md-raised" @click="leaveTheatre">Leave</md-button>
      <md-button class="md-raised" @click="deleteTheatre">Delete</md-button>
      <div class="tracking-bar">
        <div class="tracking-box">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Top from './top.vue'
  import axios from 'axios';
  import socket from '../sockets/socket'
  import incoming_data from '../sockets/observer'

  export default {
    name: "theatre",

    data() {
      return {
        videoId: '',
        textarea: '',
        player: null
      }
    },
    props: ['theatre'],
    components: {
      Top: Top
    },
    mounted() {
      this.videoId = this.$youtube.getIdFromURL(this.theatre.youtube_url);
    },
    methods: {
      ready(player) {
        this.player = player;
        window.player = player
      },
      deleteTheatre() {

      },
      sendMessage() {
        socket.send(JSON.stringify({
          "command": "send",
          "theatre": this.theatre.id,
          "message": this.textarea,
          "action": false
        }));
        this.textarea = '';
        console.log(incoming_data)
      },
      leaveTheatre() {
        // Leave room
        socket.send(JSON.stringify({
          "command": "leave",
          "theatre": this.theatre.id,
          "message": 'leave'
        }));
        this.$router.push({
          name: 'Dashboard',
        });
      },
      pauseVideo() {
        this.player.pauseVideo();
        socket.send(JSON.stringify({
          "command": "send",
          "theatre": this.theatre.id,
          "message": "pause",
          "action": true
        }));
      },
      playVideo() {
        this.player.playVideo();
        socket.send(JSON.stringify({
          "command": "send",
          "theatre": this.theatre.id,
          "message": "play",
          "action": true
        }));
        this.updateVideoTime()
      },
      updateVideoTime() {
        let widthPercentage = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
        document.getElementsByClassName('tracking-box')[0].style.width = widthPercentage.toString() + '%';
        setTimeout(this.updateVideoTime, 1000)
      }
    },
  };
</script>

<style scoped>
  .wrapper {
    width: 90%;
    margin: auto;
  }

  .title {
    text-align: center;
    padding-bottom: 40px;
    padding-top: 40px;
  }

  .video-player {
    float: left;
    width: 60%;
    height: 450px;
  }

  .chat-box {
    float: right;
    width: 40%;
    height: 450px;
    background-color: #34495e;
  }

  .input-box {
    background-color: white;
    width: 95%;
    margin: auto;
  }

  .send-button {
    background-color: white;
    float: right;
  }

  .output-box {
    width: 100%;
    height: 322px;
    overflow-y: auto;
  }

  .tracking-bar {
    width: 58%;
    height: 10px;
    background-color: black;
    margin-top: 30px;
  }

  .tracking-box {
    width: 0%;
    height: 10px;
    background: red;
  }
</style>
