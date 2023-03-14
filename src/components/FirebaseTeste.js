import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,  onValue, get, child  } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBiD1Mj44b1h3llC_AiyUyTbfLw4hXzCTY",
    authDomain: "ehvoluti-menu.firebaseapp.com",
    databaseURL: "https://ehvoluti-menu-default-rtdb.firebaseio.com",
    projectId: "ehvoluti-menu",
    storageBucket: "ehvoluti-menu.appspot.com",
    messagingSenderId: "963969707517",
    appId: "1:963969707517:web:cca7436320efa36a40fd94",
    measurementId: "G-C6MV88L3NC"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
//const database = getDatabase(app);

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  let temp = writeUserData('124','Hugo', 'hugo@hugo','testeQuaquer')
  console.log('Exec', temp)


// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });


const dbRef = ref(getDatabase(app));
let  temp2= get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


