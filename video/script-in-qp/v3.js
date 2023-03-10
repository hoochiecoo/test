// Get video element from the DOM
const videoElement = document.querySelector('video');

// Create canvas element to draw video frames
const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d');

// Define initial zoom level
let zoomLevel = 1;

// Get user permission to access camera and start video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoElement.srcObject = stream;
    videoElement.play();
  })
  .catch(error => console.error(error));

// Wait for video to finish loading and update canvas dimensions
videoElement.addEventListener('loadedmetadata', () => {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
});

// Parse the feature names from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const featureNames = urlParams.get('toggle') ? urlParams.get('toggle').split(',') : [];

// Define the feature functions
const features = {
  zoomIn: () => {
    // Increase the zoom level
    zoomLevel += 0.1;
    if (zoomLevel > 3) {
      zoomLevel = 3;
    }
  },
  zoomOut: () => {
    // Decrease the zoom level
    zoomLevel -= 0.1;
    if (zoomLevel < 1) {
      zoomLevel = 1;
    }
  }
};

// Call the enabled feature functions on an interval
setInterval(() => {
  // Draw current video frame on the canvas with zoom
  canvasContext.drawImage(
    videoElement,
    -(canvasElement.width * zoomLevel - canvasElement.width) / 2,
    -(canvasElement.height * zoomLevel - canvasElement.height) / 2,
    canvasElement.width * zoomLevel,
    canvasElement.height * zoomLevel,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // Call the enabled feature functions
  for (const featureName of featureNames) {
    const feature = features[featureName];
    if (feature) {
      feature();
    }
  }
}, 100); // Repeat every 100 milliseconds (10 frames per second)
