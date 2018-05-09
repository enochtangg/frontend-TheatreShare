<template>
  <div>
    <top></top>
    <div class="wrapper">
      <div class="title">
        <h1>{{theatre.name}}</h1>
      </div>
      <youtube :video-id="videoId" player-height="400" class="video-player"></youtube>
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
      <md-button class="md-raised" @click="deleteTheatre">Delete</md-button>
      <md-button class="md-raised" @click="leaveTheatre">Leave</md-button>
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
        textarea: ''
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
      deleteTheatre() {

      },
      sendMessage() {
        socket.send(JSON.stringify({
          "command": "send",
          "theatre": this.theatre.id,
          "message": this.textarea
        }));
        this.textarea = '';
        console.log(incoming_data)
      },
      leaveTheatre() {
        // Leave room
        socket.send(JSON.stringify({
          "command": "leave",
          "theatre": this.theatre.id
        }));
        this.$router.push({
          name: 'Dashboard',
        });
      },
      addBubble() {
        console.log('yay');
        $(".output-box").append('<div class="individual-message-box" style="width: 95%; background-color: white; float: left; margin-top: 10px; margin-left: 10px; border-radius: 15px; display: block;"><p style="float; padding-left: 10px; padding-right: 10px;">Enoch: hi</p></div>');
      },
    },
    watch: {
      incoming_data: function () {
        console.log('yay');
        this.addBubble()
      }
    }
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
    width: 58%;
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
</style>
