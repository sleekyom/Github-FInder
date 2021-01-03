import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import axios from "axios";
import "./App.css";
import Search from "./users/Search";

class App extends Component {
	state = {
		users: [],
		loading: false,
	};

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ loading: false, users: res.data });
	// }

	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, users: res.data.items });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	render() {
		const { users, loading } = this.state;
		return (
			<div className='App'>
				<header className='App-header'>
					<Navbar />
					<div className='container'>
						<Search
							searchUsers={this.searchUsers}
							clearUsers={this.clearUsers}
							showClear={users.length > 0 ? true : false}
						/>
						<Users loading={loading} users={users} />
					</div>
				</header>
			</div>
		);
	}
}

export default App;
