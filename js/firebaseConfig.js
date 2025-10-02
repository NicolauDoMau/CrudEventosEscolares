// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD9wfk9cI40mpmfydwYYM6dDTieFq3Dxaw",
	authDomain: "calendarioeventos-ece5f.firebaseapp.com",
	databaseURL: "https://calendarioeventos-ece5f-default-rtdb.firebaseio.com",
	projectId: "calendarioeventos-ece5f",
	storageBucket: "calendarioeventos-ece5f.firebasestorage.app",
	messagingSenderId: "355061405309",
	appId: "1:355061405309:web:0d37f6d6cd93efa3924314",
	measurementId: "G-PPQJ4B6GZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const  db = getFirestore(app);

export { db, app };
// Configuração do Firebase movida para o HTML principal usando CDN e <script type="module">.
// Este arquivo está vazio pois a inicialização do Firebase será feita no HTML.