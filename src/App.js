import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
	state = {
		users: [],
		loading: false,
	};

	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get("https://api.github.com/users");
		this.setState({ loading: false, users: res.data });
	}

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<Navbar />
					<div className='container'>
						<Users loading={this.state.loading} users={this.state.users} />
					</div>
				</header>
			</div>
		);
	}
}

export default App;
