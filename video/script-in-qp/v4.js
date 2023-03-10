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
const features = {
  maxBrightness: () => {
    // Get image data from the canvas
    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const data = imageData.data;

    // Find the location of the whitest pixel
    let maxBrightness = 0;
    let maxIndex = -1;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]); // Calculate pixel brightness
      if (brightness > maxBrightness) {
        maxBrightness = brightness;
        maxIndex = i;
      }
    }
    const x = (maxIndex / 4) % canvasElement.width;
    const y = Math.floor((maxIndex / 4) / canvasElement.width);

    console.log(`Whitest pixel location: (${x}, ${y})`);
  },
  lowBrightness: () => {
    // Get image data from the canvas
    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const data = imageData.data;

    // Find the location of the darkest pixel
    let minBrightness = 255;
    let minIndex = -1;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]); // Calculate pixel brightness
      if (brightness < minBrightness) {
        minBrightness = brightness;
        minIndex = i;
      }
    }
    const x = (minIndex / 4) % canvasElement.width;
    const y = Math.floor((minIndex / 4) / canvasElement.width);

    console.log(`Darkest pixel location: (${x}, ${y})`);
  },
  zoomIn: () => {
    const currentWidth = videoElement.videoWidth;
    const currentHeight = videoElement.videoHeight;
    const newWidth = currentWidth * 1.1;
    const newHeight = currentHeight * 1.1;
    videoElement.style.width = `${newWidth}px`;
    videoElement.style.height = `${newHeight}px`;
  },
  zoomOut: () => {
    const currentWidth = videoElement.videoWidth;
    const currentHeight = videoElement.videoHeight;
    const newWidth = currentWidth * 0.9;
    const newHeight = currentHeight * 
