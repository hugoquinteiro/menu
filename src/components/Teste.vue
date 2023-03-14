<template>
  <div>
    <!-- <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
          >
            This alert will dismiss after {{ dismissCountDown }} seconds...
          </b-alert> -->
    <b-alert :show="tempo" dismissible variant="warning" @dismissed="tempo = 0">
      Alerta 2 {{ dismissCountDown }} seconds...
    </b-alert>
    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
    <b-button @click="show2" variant="info" class="m-1">
      Show 2
    </b-button>
    <!-- <hr> Teste de Gravação -->
    <hr>
    <b-button @click="gravaFirebase"> Teste FireBase</b-button>
    
    <!-- Teste de UPload de arquivos -->
    <hr>
    <div class="form-group flex-column col-12 d-flex align-items-center">
      <input ref="input" type="file" class="d-none" accept="image/*" @change="handleFile($event)">
      <b-button @click="uploadFile">Upload</b-button>
      <div v-if="imageFile != ''"> {{ imageFile.name }}
        <button class="btn badge badge-ligth" @click="imageFile = ''"><i class="fa fa-trash"></i></button>
      </div>
      <b-button variant="dark" @click="enviar">Enviar File</b-button>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, get, child } from "firebase/database";
import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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

//Rodar para funcionar o Storage
//gsutil -m acl ch -r -u service-ehvoluti-menu@gcp-sa-firebasestorage.iam.gserviceaccount.com gs://ehvoluti-menu.appspot.com

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default {
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      tempo: 0,
      imageFile: '',
      linkFile:''
    }
  },
  methods: {
    uploadFile() {
      this.$refs.input.value = ''
      this.$refs.input.click()
    },
    enviar() {
      console.log('Enviar File')
      const storageRef = ref(storage, this.imageFile.name);

     // 'file' comes from the Blob or File API
      uploadBytes(storageRef, this.imageFile).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(snapshot.ref).then((res) => {
          console.log('LINK',res)
        })
      });

      //const uploadTask = uploadBytesResumable(storageRef, this.imageFile);


      // uploadTask.on('state_changed',
      //   (snapshot) => {
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log('Upload is ' + progress + '% done');
      //     switch (snapshot.state) {
      //       case 'paused':
      //         console.log('Upload is paused');
      //         break;
      //       case 'running':
      //         console.log('Upload is running');
      //         break;
      //     }
      //   },
      //   (error) => {
      //     // A full list of error codes is available at
      //     // https://firebase.google.com/docs/storage/web/handle-errors
      //     switch (error.code) {
      //       case 'storage/unauthorized':
      //         // User doesn't have permission to access the object
      //         break;
      //       case 'storage/canceled':
      //         // User canceled the upload
      //         break;

      //       // ...

      //       case 'storage/unknown':
      //         // Unknown error occurred, inspect error.serverResponse
      //         break;
      //     }
      //   },
      //   async () => {
      //     // Upload completed successfully, now we can get the download URL
      //     this.linkFile = await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       //console.log('Link File:', downloadURL)
      //       return downloadURL
      //     });
      //     console.log('Link Download:', this.linkFile)
      //   }
      //   );
    },
    handleFile(ev) {
      //  console.log(ev.target.files[0])
      this.imageFile = ev.target.files[0]
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    show2() {
      this.tempo = 2
    },
    gravaFirebase() {
      // const ref = app.database().ref('teste')
      // const id = ref.push().key

      // ref.child(id).set({nome:'hugo'}, err =>{
      //   if (err){
      //     console.log('Errou:', err)
      //   } else{
      //     console.log('Gravou')
      //   }
      // })
      const db = getDatabase(app);
      console.log('Tentando Gravar')
      set(ref(db, 'users/xXxX'), {dados:"teste"})

      // set(ref(db, 'users/abc'), {nome: 'TESTE HUGO'})
      //   .then(() => {
      //     console.log('Gravou')
      //   })
      //   .catch((error) => {
      //     console.log('ERRRRRRRORRR',error)
      //   });

      //   function writeUserData(userId, name, email, imageUrl) {
      //   const db = getDatabase(app);
      //   set(ref(db, 'users/' + userId), {
      //     username: name,
      //     email: email,
      //     profile_picture : imageUrl
      //   }).then( res => console.log(res))
      // }

      //    writeUserData('2','Helo', 'hugo@hugo','testeQuaquer')
    }
  }
}
</script>