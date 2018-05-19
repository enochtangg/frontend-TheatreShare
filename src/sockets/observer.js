import socket from "./socket";

socket.onmessage = function (message) {
  // Decode the JSON
  console.log("Got websocket message " + message.data);
  let incoming_data = JSON.parse(message.data);
  // Handle errors
  if (incoming_data.error) {
    alert(incoming_data.error);
    return;
  }
  if (incoming_data.msg_type == 0 && incoming_data.action == false) {
    $(".output-box").append('<div class="individual-message-box" style="width: 95%; background-color: white; float: left; margin-top: 10px; margin-left: 10px; border-radius: 15px; display: block;"><p style="float; padding-left: 10px; padding-right: 10px;">' + incoming_data.username + ': ' + incoming_data.message + '</p></div>');
  }
  else if (incoming_data.msg_type == 4 && incoming_data.message.substring(0, 5) == 'enter') {
    $(".output-box").append('<div class="individual-message-box" style="width: 95%; background-color: white; float: left; margin-top: 10px; margin-left: 10px; border-radius: 15px; display: block;"><p style="float; padding-left: 10px; padding-right: 10px;">' + incoming_data.message.substring(6) + ' has joined the room' + '</p></div>');
  }
  else if (incoming_data.msg_type == 5 && incoming_data.message.substring(0, 5) == 'leave') {
    $(".output-box").append('<div class="individual-message-box" style="width: 95%; background-color: white; float: left; margin-top: 10px; margin-left: 10px; border-radius: 15px; display: block;"><p style="float; padding-left: 10px; padding-right: 10px;">' + incoming_data.message.substring(6) + ' has left the room' + '</p></div>');
  }
  else if (incoming_data.action == true && incoming_data.message == 'pause') {
    window.player.pauseVideo()
  }
  else if (incoming_data.action == true && incoming_data.message == 'play') {
    window.player.playVideo();
    incrementVideoTime()
  }
  else if (incoming_data.action == true && incoming_data.message.substring(0, 9) == 'track-to-') {
    window.player.seekTo(incoming_data.message.substring(9));
  }

  function incrementVideoTime() {
    let widthPercentage = (window.player.getCurrentTime() / window.player.getDuration()) * 100;
    document.getElementsByClassName('tracking-box')[0].style.width = widthPercentage.toString() + '%';
    setTimeout(incrementVideoTime, 1000)
  }
};

