<template>
  <div>
    <top></top>
    <div class="wrapper">
      <div class="title">
        <h1>{{theatre.name}}</h1>
      </div>
      <youtube :video-id="videoId" player-width="854" player-height="480" @ready="ready"
               :player-vars="{controls: 0}"
               class="video-player"></youtube>
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
  import socket from '../sockets/socket'
  import '../sockets/observer'
  import $ from 'jquery'

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
      window.theatre = this.theatre;

      socket.send(JSON.stringify({
        "command": "join",
        "theatre": this.theatre.id,
        "message": 'enter:' + document.username
      }));

      $(".tracking-bar").click(function (e) {
        let parentOffset = $(this).parent().offset();
        let relX = e.pageX - parentOffset.left;

        let percentageX = (relX / document.getElementsByClassName("tracking-bar")[0].offsetWidth) * 100;
        document.getElementsByClassName('tracking-box')[0].style.width = percentageX.toString() + '%';
        let timeInVideo = (percentageX * window.player.getDuration()) / 100;
        window.player.seekTo(timeInVideo);

        socket.send(JSON.stringify({
          "command": "send",
          "theatre": window.theatre.id,
          "message": 'track-to-' + timeInVideo,
          "action": true
        }));
      });
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
          "message": 'leave:' + document.username
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

        this.incrementVideoTime()
      },
      incrementVideoTime() {
        let widthPercentage = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
        document.getElementsByClassName('tracking-box')[0].style.width = widthPercentage.toString() + '%';
        setTimeout(this.incrementVideoTime, 1000)
      },
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
    width: 62%;
    height: 450px;
  }

  .chat-box {
    float: right;
    width: 38%;
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
    height: 10px;
    background: red;
  }
</style>
