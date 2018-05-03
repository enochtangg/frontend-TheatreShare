<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrapper" id="center">
      <h1>{{theatre.name}}</h1>
      <p>{{theatre}}</p>
      <youtube :video-id="videoId"></youtube>
    </div>
  </div>
</template>

<script>
  import NavBar from './navbar.vue'

  export default {
    name: "theatre",

    data() {
      return {
        videoId: '',
      }
    },
    props: ['theatre'],
    components: {
      NavBar: NavBar
    },
    mounted () {
      this.videoId = this.$youtube.getIdFromURL(this.theatre.youtube_url)
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
