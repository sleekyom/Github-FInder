import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import User from "./users/Users";

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<Navbar />
					<div className='container'>
						<User />
					</div>
				</header>
			</div>
		);
	}
}

export default App;
