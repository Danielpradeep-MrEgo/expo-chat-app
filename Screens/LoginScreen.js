import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import { google } from "../firebase";
import { auth } from "../firebase";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import * as GoogleSignIn from "expo-google-sign-in";

const LoginScreen = () => {
	function onSignIn(googleUser) {
		console.log("Google Auth Response", googleUser);
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
			unsubscribe();
			// Check if we are already signed-in Firebase with the correct user.
			if (!isUserEqual(googleUser, firebaseUser)) {
				// Build Firebase credential with the Google ID token.
				console.log(
					"Google Auth Response?>>>>>>>>>>>>>",
					googleUser,
					firebaseUser
				);

				var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken
				);

				// Sign in with credential from the Google user.
				auth.signInWithCredential(credential).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// The email of the user's account used.
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;
					// ...
				});
			} else {
				console.log("User already signed-in Firebase.");
			}
		});
	}
	const user = auth.currentUser;
	console.log(user, "user>>>>>>>>>>>>>>>>>");

	function isUserEqual(googleUser, firebaseUser) {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId ===
						firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	}

	const signInWithGoogleAsync = async () => {
		console.log("done");
		try {
			const result = await Google.logInAsync({
				behavior: "web",
				androidClientId:
					// 	"503536628199-trtuuqlh20g7p8me33g6gfis198via5l.apps.googleusercontent.com",
					"199080822964-heu9kbdao6h06g9eqhls35s568g51qn2.apps.googleusercontent.com",
				iosClientId:
					"199080822964-9sta043pvuov4v96u1dlqe1is38lp6fs.apps.googleusercontent.com",
				// iosClientId:
				// "503536628199-jpsai98s26hq15vkolne0g96fd914os3.apps.googleusercontent.com",
				scopes: ["profile", "email"],
			});

			if (result.type === "success") {
				onSignIn(result);
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
	return (
		<View>
			<Button title="sign in with Google" onPress={signInWithGoogleAsync} />
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
