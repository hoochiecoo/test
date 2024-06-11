// Your JavaScript code here
//console.log('Hello, PWA!');
// Define the database name and version
const DB_NAME = "dogStoreDB";
const DB_VERSION = 1;

// Define the object store name
const STORE_NAME = "dogs";

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
    
    // Create an object store for dogs
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement:true });
        
        // Define the structure of the data
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("breed", "breed", { unique: false });
        objectStore.createIndex("age", "age", { unique: false });
    }
};

// Function to add a dog to the database
function addDog(name, breed, age) {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    
    const newDog = {
        name: name,
        breed: breed,
        age: age
    };
    
    const request = objectStore.add(newDog);
    
    request.onsuccess = function(event) {
        console.log("Dog added to the database");
    };
    
    request.onerror = function(event) {
        console.error("Error adding dog to the database: " + event.target.errorCode);
    };
}

// Function to retrieve all dogs from the database
function getAllDogs() {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();
    
    request.onsuccess = function(event) {
        const dogs = event.target.result;
        console.log("All dogs:", dogs);
        // Here you can use the retrieved data to update your UI or perform any other actions
    };
    
    request.onerror = function(event) {
        console.error("Error getting dogs from the database: " + event.target.errorCode);
    };
}

// Example usage:
// Adding a dog
addDog("Max", "Labrador", 3);

// Retrieving all dogs
getAllDogs();
