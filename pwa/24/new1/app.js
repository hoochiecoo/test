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

// Function to add a dog to the database and update the UI
function addDogAndRefreshUI(name, breed, age) {
    addDog(name, breed, age, function() {
        refreshDogList();
    });
}

// Function to retrieve all dogs from the database and update the UI
function getAllDogsAndRefreshUI() {
    getAllDogs(function(dogs) {
        updateDogListUI(dogs);
    });
}

// Function to add a dog to the database
function addDog(name, breed, age, callback) {
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
        if (callback) {
            callback();
        }
    };
    
    request.onerror = function(event) {
        console.error("Error adding dog to the database: " + event.target.errorCode);
    };
}

// Function to retrieve all dogs from the database
function getAllDogs(callback) {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();
    
    request.onsuccess = function(event) {
        const dogs = event.target.result;
        console.log("All dogs:", dogs);
        if (callback) {
            callback(dogs);
        }
    };
    
    request.onerror = function(event) {
        console.error("Error getting dogs from the database: " + event.target.errorCode);
    };
}

// Function to update the UI with the list of dogs
function updateDogListUI(dogs) {
    const dogListContainer = document.getElementById("dog-list-container");
    dogListContainer.innerHTML = "";
    
    const dogList = document.createElement("ul");
    dogs.forEach(function(dog) {
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${dog.name}, Breed: ${dog.breed}, Age: ${dog.age}`;
        dogList.appendChild(listItem);
    });
    dogListContainer.appendChild(dogList);
}

// Function to create buttons and initialize the UI
function createButtons() {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Dog";
    addButton.addEventListener("click", function() {
        const name = prompt("Enter the dog's name:");
        const breed = prompt("Enter the dog's breed:");
        const age = parseInt(prompt("Enter the dog's age:"));
        
        addDogAndRefreshUI(name, breed, age);
    });
    
    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh Dog List";
    refreshButton.addEventListener("click", function() {
        getAllDogsAndRefreshUI();
    });
    
    const dogListContainer = document.createElement("div");
    dogListContainer.id = "dog-list-container";
    
    document.body.appendChild(addButton);
    document.body.appendChild(refreshButton);
    document.body.appendChild(dogListContainer);
}

// Initialize the UI
createButtons();
