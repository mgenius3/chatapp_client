import React from "react";

import "./message.css";

import ReactEmoji from "react-emoji";
const Message = ({ message: { user, text, time }, name, key }) => {
	let isSentByCurrentUser = false;
	const trimmedName = name.trim().toLowerCase();
	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}
	return isSentByCurrentUser ? (
		<div key={key} className="messageContainer justifyEnd">
			<p className="sentText pr-10">you</p>
			<div className="messageBox backgroundBlue">
				<p className="messageText colorwhite">
					{ReactEmoji.emojify(text)}
				</p>
				<strong className="time usertime">{time}</strong>
			</div>
		</div>
	) : user ===
	  "admin" /*we are making the message not to display in the message box if the user is an admin*/ ? (
		""
	) : (
		<div key={key} className="messageContainer justifyStart">
		<strong className="time otherusertime">{time}</strong>
			<div className="messageBox backgroundLight">
				<p className="messageText colorDark">
					{ReactEmoji.emojify(text)}
				</p>	
			</div>

			<p className="sentText pl-10">{user}</p>
		</div>
	);
};
export default Message;
