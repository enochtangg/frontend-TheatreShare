<template>
  <div>
    <top></top>
    <div class="wrapper" id="center">
      <h1>{{theatre.name}}</h1>
      <p>{{theatre}}</p>
      <youtube :video-id="videoId"></youtube>
      <md-button class="md-raised" @click="deleteTheatre">Delete</md-button>
    </div>
  </div>
</template>

<script>
  import Top from './top.vue'
  import axios from 'axios';

  export default {
    name: "theatre",

    data() {
      return {
        videoId: '',
      }
    },
    props: ['theatre'],
    components: {
      Top: Top
    },
    mounted () {
      this.videoId = this.$youtube.getIdFromURL(this.theatre.youtube_url)
    },
    methods: {
      deleteTheatre() {
        axios.delete('http://localhost:8000/theatres/')
      }
    }
  }
</script>

<style scoped>
  #center {
    text-align: center;
    padding-top: 50px;
  }

  .wrapper {
    width: 70%;
    margin: auto;
  }

  .video-player {
  }

</style>
