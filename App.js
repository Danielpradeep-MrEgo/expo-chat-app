import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import ChatScreen from "./Screens/ChatScreen";
import { auth } from "./firebase";
import firebase from "firebase";

const Stack = createStackNavigator();

export default function App() {
	const user = auth.currentUser;
	useEffect(() => {
		const user = auth.currentUser;
	}, [user]);

	console.log(user, "appp?>>>>>>>>>>>>>>");
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!user ? (
					<Stack.Screen name="Login" component={LoginScreen} />
				) : (
					<Stack.Screen name="Chat" component={ChatScreen} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
