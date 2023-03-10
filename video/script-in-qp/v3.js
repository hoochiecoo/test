// check if browser supports getUserMedia method
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  
  // define constraints for accessing camera
  var constraints = {
    video: true
  };

  // access camera using getUserMedia method
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      
      // get video element on page
      var video = document.getElementById('video');

      // set video source to the media stream from the camera
      video.srcObject = mediaStream;

      // play the video
      video.play();

      // get camera track from media stream
      var track = mediaStream.getVideoTracks()[0];

      // check if camera supports zooming
      if('getCapabilities' in track) {
        var capabilities = track.getCapabilities();

        // check if camera supports zoom
        if('zoom' in capabilities) {
          var zoomControl = document.getElementById('zoom');

          // set range input to control zoom
          zoomControl.min = capabilities.zoom.min;
          zoomControl.max = capabilities.zoom.max;
          zoomControl.step = capabilities.zoom.step;
          zoomControl.value = capabilities.zoom.current;

          // add event listener to zoom control
          zoomControl.addEventListener('input', function(event) {
            // set zoom level
            track.applyConstraints({ advanced: [ { zoom: event.target.value } ] });
          });
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
