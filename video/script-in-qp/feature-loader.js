// Get video element from the DOM
const videoElement = document.querySelector('video');

// Create canvas element to draw video frames
const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d');

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
const features = {};
featureNames.forEach(featureName => {
const feature = require(./features/${featureName});
features[featureName] = feature;
});

// Call the enabled feature functions on an interval
setInterval(() => {
// Draw current video frame on the canvas
canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

// Call the enabled feature functions
for (const featureName of featureNames) {
const feature = features[featureName];
if (feature) {
feature();
}
}
}, 100); // Repeat every 100 milliseconds (10 frames per second)
