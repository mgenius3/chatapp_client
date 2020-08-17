import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";
const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
			  <h3>M</h3>
			  <p>Chat App</p>
			  <i>mosboy</i>
					<div> 
						<input
							placeholder="Name"
							className="joinInput"
							type="text"
							onChange={(event) => setName(event.target.value)}
							autoComplete
						/> 
					</div>
					<div>
						<input
							placeholder="Room"
							className="joinInput"
							type="text"
							onChange={(event) => setRoom(event.target.value)}
							autoComplete="true"
						/>
					</div>
				
					<Link
						onClick={
							(event) =>

								!name || !room
									? event.preventDefault()
									: null/*the onclick function will make the body only submit the to the url if the name and room is already passed in the the input tag*/
						}
						to={`/image?name=${name}&room=${room}`}
					>
						<button className="button mt-20" type="submit" >
							Sign In
						</button>
					</Link>
			</div>
		</div>
	);
};
export default Join;
