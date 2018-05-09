// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './stylesheets/style.css'

import VueYouTubeEmbed from 'vue-youtube-embed'
import VueSocketio from 'vue-socket.io';

//jQuery
window.$ = window.jQuery = require('jquery');

Vue.use(VueMaterial);
Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

// Initial connection to backend websocket
// Correctly decide between ws:// and wss://
// let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
// let ws_path = ws_scheme + '://localhost:8000' + "/chat/stream/";
// console.log("Connecting to " + ws_path);
// const ReconnectingWebSocket = require('reconnecting-websocket');
// window.socket = new ReconnectingWebSocket(ws_path);

// // Helpful debugging
// window.socket.onopen = function () {
//   console.log("Connected to chat socket");
// };
// window.socket.onclose = function () {
//   console.log("Disconnected from chat socket");
// };
//
// window.socket.onmessage = function (message) {
//   // Decode the JSON
//   console.log("Got websocket message " + message.data);
//   window.incoming_data = JSON.parse(message.data);
//   // Handle errors
//   if (window.incoming_data.error) {
//     alert(window.incoming_data.error);
//     return;
//   }
// };

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});

