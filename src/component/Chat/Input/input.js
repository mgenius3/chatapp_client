import React from "react";

import "./input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="input_form">
      <input
        className="input"
        type="text"
        placeholder="type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          /Enter/.test(event.key) ? sendMessage(event) : null
        }
      />

      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        send
      </button>
    </form>
  );
};
export default Input;
