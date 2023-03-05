const configuration = {
  iceServers: [{urls: "stun:stun.l.google.com:19302"}]
};

const peerConnection = new RTCPeerConnection(configuration);

const sendChannel = peerConnection.createDataChannel("sendChannel");
sendChannel.onmessage = event => {
  const receiveTextArea = document.getElementById("receive");
  receiveTextArea.value += event.data + "\n";
};

function sendData() {
  const sendTextArea = document.getElementById("send");
  const data = sendTextArea.value;
  sendChannel.send(data);
  sendTextArea.value = "";
}

peerConnection.onicecandidate = event => {
  if (event.candidate) {
    // send the candidate to the remote peer
  }
};

// set up the negotiation process
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

// send the offer to the remote peer
// receive the offer from the remote peer
const remoteOffer = ...;

await peerConnection.setRemoteDescription(remoteOffer);

// create the answer
const answer = await peerConnection.createAnswer();
await peerConnection.setLocalDescription(answer);

// send the answer to the remote peer
// receive the answer from the remote peer
const remoteAnswer = ...;

await peerConnection.setRemoteDescription(remoteAnswer);
