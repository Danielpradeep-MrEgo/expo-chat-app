import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDlKpWFdeYZ7pr11wbpiXqSTHyY6ECoopo",
	authDomain: "signal-b9716.firebaseapp.com",
	databaseURL: "https://signal-b9716-default-rtdb.firebaseio.com",
	projectId: "signal-b9716",
	storageBucket: "signal-b9716.appspot.com",
	messagingSenderId: "199080822964",
	appId: "1:199080822964:web:943fde4fb577c5f4946fe1",
	measurementId: "G-JF8PSEFWV5",
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();

export { google, db, auth };
