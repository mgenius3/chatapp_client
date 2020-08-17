import React, { useState, useEffect } from "react";
import Message from "../Message/message";
import "./messages.css";
//import { css } from 'glamor';
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, name }) => {
	const getAdminText = messages.filter(
		(message, i) => message.user === "admin"
	); //get all the admin messages from all the messages sent
	const getAdminLastMessage = getAdminText.map((message, i) => message.text); //getting the text that was sent by the admin
	const getAdminLastTextMessage = getAdminLastMessage
		.splice(-1, 1)
		.toString(); //getting the new text that was sent by the admin
	return (
		<ScrollToBottom className="ScrollToBottom">
			<div className="adminText">{getAdminLastTextMessage}</div>
			{messages.map((message, i) => (
				<Message message={message} name={name} key={i} />
			))}
		</ScrollToBottom>
	);
};
export default Messages;
