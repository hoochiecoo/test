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
  maxBrightness2: () => {
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

    // Surround the maxBrightness pixel with a red circle
    const circleRadius = 10;
    const lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.arc(x, y, circleRadius, 0, 2 * Math.PI);
    canvasContext.strokeStyle = 'red';
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();

    console.log(`Whitest pixel location: (${x}, ${y})`);
  }
};

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
