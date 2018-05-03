<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrapper" id="center">
      <h1>{{theatre.name}}</h1>
      <md-field>
          <label>Youtube URL</label>
          <md-input v-model="url" type="url"></md-input>
        </md-field>
      <md-button class="md-raised" @click="getVideoId">Submit</md-button>
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
        url: ''
      }
    },
    props: ['theatre'],
    components: {
      NavBar: NavBar
    },
    methods: {
      getVideoId() {
        this.videoId = this.$youtube.getIdFromURL(this.url)
        this.url = ''
      },
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

</style>
