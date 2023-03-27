import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as dotenv from 'dotenv';

dotenv.config();


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "comunidade-cfo.firebaseapp.com",
    projectId: "comunidade-cfo",
    storageBucket: "comunidade-cfo.appspot.com",
    messagingSenderId: "164488602063",
    appId: "1:164488602063:web:a5daba52b0d5e9370532ba",
    measurementId: "G-BJ2P3NPQLT"
};

const app = initializeApp(firebaseConfig);
const FB_Auth = getAuth(app);

export default FB_Auth;