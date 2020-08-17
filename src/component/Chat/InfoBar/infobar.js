import React, {useState, useEffect } from "react";
import avatar from "./img/img_avatar.png";
import "./infobar.css";

const InfoBar = ({ name, room, usernameOnline, messages }) => {
  const [ifImageFound, setIfImageFound] = useState(false);
  let getUserNameIndex = usernameOnline.findIndex(
    (user) => user == name.toLowerCase()
  ); //getting the name of the name index of the main user
  var getUserName = usernameOnline[getUserNameIndex]; //getting the name of the main user
  delete usernameOnline[getUserNameIndex]; //deleting the main user name from the array.
  fetch(`https://mosboy-chat-app.herokuapp.com/${name}${room}`).then(imgFound=>{
    if(imgFound){
          setIfImageFound(true)
    }
  })
  return (
    <div className="infobar">
      <div className="OuterContainer">
        <div className="InnerContainer">
        {ifImageFound ? (<img src={`https://mosboy-chat-app.herokuapp.com/${name}${room}`} alt="my photo"/>) : (<img src={avatar} alt="my photo"/>)
        }
          <h3 className="room_name">{room}</h3>
          <select
            title="Active users"  
            style={{
              fontFamily: "monospace",
              fontVariant: "small-caps",
              textAlign: "center",
            }}
          >
            <option
              style={{ fontFamily: "monospace", fontVariant: "small-caps" }}
            >
              {getUserName}
            </option>
            {usernameOnline.map((names, i) => (
              <option className="center" disabled key={i}>
                {names}
              </option>
            ))}
          </select>
          <a href="/">
            <span title="close chat">&#9876;</span>
          </a>
        </div>
      </div>
    </div>
  );
}; 
export default InfoBar;
