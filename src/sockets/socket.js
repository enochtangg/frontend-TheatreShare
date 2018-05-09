// Initial connection to backend websocket
// Correctly decide between ws:// and wss://
let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
let ws_path = ws_scheme + '://localhost:8000' + "/chat/stream/";
console.log("Connecting to " + ws_path);
const ReconnectingWebSocket = require('reconnecting-websocket');
let socket = new ReconnectingWebSocket(ws_path);

// Helpful debugging
socket.onopen = function () {
  console.log("Connected to chat socket");
};
socket.onclose = function () {
  console.log("Disconnected from chat socket");
};

export default socket
