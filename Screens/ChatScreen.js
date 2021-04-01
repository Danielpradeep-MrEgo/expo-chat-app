import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth, db } from "../firebase";

const ChatScreen = () => {
	const user = auth.currentUser;
	console.log(user.uid, "chat>>>>>>>>");
	const [input, setInput] = useState("");

	const send = async () => {
		db.collection("chats").doc(`${user.uid}`).collection("messages").add({
			message: input,
		});
		setInput("");
	};

	return (
		<View>
			<Input
				type="text"
				placeholder="type here"
				value={input}
				onChangeText={(text) => setInput(text)}
			/>
			<Button onPress={send} title="send" />
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({});
