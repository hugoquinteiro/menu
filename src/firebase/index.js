//import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
//import 'firebase/auth'
import { getAuth} from "firebase/auth";
import 'firebase/storage'
import 'firebase/database'

export const firebaseApp = initializeApp({
    apiKey: process.env.VUE_APP_API_KEY
    ,authDomain: process.env.VUE_APP_AUTH_DOMAIN
    ,databaseURL: process.env.VUE_APP_DATABASE_URL
    ,projectId: process.env.VUE_APP_PROJECT_ID
    ,storageBucket: process.env.VUE_APP_STORAGE_BUCKET
    ,messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
    ,appId: process.env.VUE_APP_ID
    ,measurementId: process.env.VUE_APP_MEASUREMENT_ID
})

const auth = getAuth(firebaseApp);

export default function install(Vue){
    Object.defineProperty(Vue.prototype, '$firebase',{
        get () {
            return {firebaseApp, auth}
        }
    })
}