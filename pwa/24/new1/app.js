// Define the database name and version
const DB_NAME = "timestampDB";
const DB_VERSION = 1;

// Define the object store name
const STORE_NAME = "timestamps";

// Open a connection to the IndexedDB database
let db;

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
    console.log("Database opened successfully");
    db = event.target.result;
};

request.onupgradeneeded = function(event) {
    console.log("Upgrading database...");
    const db = event.target.result;
    
    // Create an object store for timestamps
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement:true });
    }
};

// Function to add a timestamp to the database
function addTimestampToDB() {
    const timestamp = new Date().getTime();
    
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    
    const request = objectStore.add(timestamp);
    
    request.onsuccess = function(event) {
        console.log("Timestamp added to the database");
    };
    
    request.onerror = function(event) {
        console.error("Error adding timestamp to the database: " + event.target.errorCode);
    };
}

// Create a button and attach click event
document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Timestamp";
    addButton.addEventListener("click", function() {
        addTimestampToDB();
    });
    
    document.body.appendChild(addButton);
});
