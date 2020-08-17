import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./component/Join/join";
import Chat from "./component/Chat/chat";
import UserImage from "./component/UserImage/UserImage"
const App = () => (
	<Router>
		<Route path="/" exact component={Join} />
		<Route path="/image" component={UserImage}/>
		<Route path="/chat" component={Chat} />
	</Router>
);
export default App;
