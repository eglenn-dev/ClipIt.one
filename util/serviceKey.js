const fs = require('fs');
const serviceAccount = require("../clipit-one-firebase-adminsdk-fbsvc-ea6b7bc529.json");

// Convert the JSON object to a string
const serviceAccountString = JSON.stringify(serviceAccount);

console.log(serviceAccountString);