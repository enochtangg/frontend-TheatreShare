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

//jQuery
window.$ = window.jQuery = require('jquery')

Vue.use(VueMaterial);
Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

// Initial connection to backend websocket
// Correctly decide between ws:// and wss://
let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
let ws_path = ws_scheme + '://localhost:8000' + "/chat/stream/";
console.log("Connecting to " + ws_path);
const ReconnectingWebSocket = require('reconnecting-websocket');
window.socket = new ReconnectingWebSocket(ws_path);

// Helpful debugging
window.socket.onopen = function () {
  console.log("Connected to chat socket");
};
window.socket.onclose = function () {
  console.log("Disconnected from chat socket");
}
