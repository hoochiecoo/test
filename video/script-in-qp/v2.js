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
 pointSpeed: () => {
    const lastPositions = []; // Array to store the last positions of the point
    let lastTimestamp = null; // Timestamp of the last frame

    // Function to calculate the distance between two points
    const distance = (x1, y1, x2, y2) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    // Function to track the position of the point and calculate its speed
    const trackPoint = () => {
      // Get image data from the canvas
      const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const data = imageData.data;

      // Find the position of the point in the current frame
      let pointX = null;
      let pointY = null;
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvasElement.width;
        const y = Math.floor((i / 4) / canvasElement.width);
        const brightness = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]); // Calculate pixel brightness
        if (distance(x, y, pointX, pointY) < 10 && brightness > 128) { // Assume the point is a bright spot with a radius of 10 pixels
          pointX = x;
          pointY = y;
          break;
        }
      }

      // Calculate the speed of the point
      const timestamp = performance.now();
      if (lastPositions.length > 0 && pointX !== null && pointY !== null) {
        const lastX = lastPositions[lastPositions.length - 1][0];
        const lastY = lastPositions[lastPositions.length - 1][1];
        const d = distance(lastX, lastY, pointX, pointY);
        const dt = timestamp - lastTimestamp;
        const speed = d / dt; // Speed in pixels per millisecond
        console.log(`Point speed: ${speed.toFixed(2)} pixels/ms`);
      }

      // Update the last positions and timestamp
      if (pointX !== null && pointY !== null) {
        lastPositions.push([pointX, pointY]);
        if (lastPositions.length > 10) { // Keep only the last 10 positions
          lastPositions.shift();
        }
      }
      lastTimestamp = timestamp;

      // Call this function again on the next animation frame
      requestAnimationFrame(trackPoint);
    };

    // Start tracking the point
    trackPoint();
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
