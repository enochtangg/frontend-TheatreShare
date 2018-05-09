import socket from "./socket";


let incoming_data = null;

socket.onmessage = function (message) {
  // Decode the JSON
  console.log("Got websocket message " + message.data);
  incoming_data = JSON.parse(message.data);
  // Handle errors
  if (incoming_data.error) {
    alert(incoming_data.error);
    return;
  }
};

export default incoming_data
