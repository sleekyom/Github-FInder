import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import UserItem from "./users/UserItem";

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<Navbar />
					<UserItem />
				</header>
			</div>
		);
	}
}

export default App;
