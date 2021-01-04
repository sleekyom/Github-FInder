import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import User from "./users/User";
import axios from "axios";
import Search from "./users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/layout/pages/About";
import "./App.css";

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null,
	};

	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, users: res.data.items });
	};

	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, user: res.data });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => {
			this.setState({ alert: null });
		}, 5000);
	};

	render() {
		const { users, user, loading } = this.state;
		return (
			<Router>
				<div className='App'>
					<header className='App-header'>
						<Navbar />
						<div className='container'>
							<Alert alert={this.state.alert} />
							<Switch>
								<Route
									exact
									path='/'
									render={(props) => (
										<Fragment>
											<Search
												searchUsers={this.searchUsers}
												clearUsers={this.clearUsers}
												showClear={users.length > 0 ? true : false}
												setAlert={this.setAlert}
											/>
											<Users loading={loading} users={users} />
										</Fragment>
									)}
								/>
								<Route exact path='/about' component={About} />
								<Route
									exact
									path='/user/:login'
									render={(props) => (
										<User
											{...props}
											getUser={this.getUser}
											user={user}
											loading={loading}
										/>
									)}
								/>
							</Switch>
						</div>
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
