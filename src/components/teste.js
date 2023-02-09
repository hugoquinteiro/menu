// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiD1Mj44b1h3llC_AiyUyTbfLw4hXzCTY",
  authDomain: "ehvoluti-menu.firebaseapp.com",
  databaseURL:'https://ehvoluti-menu-default-rtdb.firebaseio.com/',
  projectId: "ehvoluti-menu",
  storageBucket: "ehvoluti-menu.appspot.com",
  messagingSenderId: "963969707517",
  appId: "1:963969707517:web:cca7436320efa36a40fd94",
  measurementId: "G-C6MV88L3NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var getDatabase = app.database()
var tableDados = getDatabase.ref('dados')

tableDados.child("dados").get().then((snapshot) => { 
    console.log(snapshot)
})



