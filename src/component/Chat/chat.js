import React, { useState, useEffect } from "react";
import queryString from "query-string"; //this will help us in retrieving data from the url
import io from "socket.io-client";
import "./chat.css";
import InfoBar from "./InfoBar/infobar";
import Input from "./Input/input";
import Messages from "./Messages/messages";

let socket;
const Chat = ({ location }) => {
	let date = new Date();
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [usernameOnline, setUserNameOnline] = useState([]);
	const ENDPOINT = "https://mosboy-chat-app.herokuapp.com";

	useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);
			socket = io(ENDPOINT); //getting the server add for socket io connection
			setName(name);
			setRoom(room);
			socket.emit("join", { name, room }, (
				gettingCallback /*this 3rd parameter will receive the message that was returned from the callback of the server side*/
			) => {
				if (gettingCallback) {
					console.log("user has joined successfully");
					//alert(gettingCallback)
				}
			});
			return () => {
				//use Effect reacthooks will make this function only run if the component is unmounted;
				socket.emit("disconnect"); //emit a disconnect event to the server
				socket.off(); //cut off the socket from other connected socket
			};
		},
		[
			ENDPOINT,
			location.search,
		] /* this array will make the useEffect function only call once except the values in the array is being changed then it will call itself as soon as the array value is changed*/
	);

	useEffect(() => {
		socket.on("message", (message) => {
			//alert(`${message.text},please speak well to him.`)
			console.log("messages is stored successfully");
			setMessages([...messages, message]); //this will add any new messages sent by admin or any member of the chat
		});
	}, [messages]);

	useEffect(() => {
		socket.on("roomData", (userINFO) => {
			console.log(userINFO);
			const userInfoName = userINFO.users.map((user) => user.name);
			console.log(userInfoName);
			setUserNameOnline([...userInfoName]);
		});
	}, [messages]);

	console.log(message, messages);

	const sendMessage = (e) => {
		console.log(message);
		e.preventDefault();
		const time = `${date.getHours()}:${date.getMinutes()}`;
		if (message) {
			socket.emit(
				"sendMessage",
				{ message, name, time },
				(callbackError) => {
					setMessage("");
					if (callbackError) {
						alert(callbackError);
					}
				}
			);
		}
	};

	return (
	   <main>
		<div className="chat_outerContainer">
			<div className="chat_container">
				<InfoBar
					name={name}
					room={room}
					usernameOnline={usernameOnline}
					messages={messages}
				/>
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	</main>
	);
};
export default Chat;
