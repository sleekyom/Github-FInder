import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import axios from "axios";
import Search from "./users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/layout/pages/About";
import "./App.css";

class App extends Component {
	state = {
		users: [],
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
		const { users, loading } = this.state;
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
							</Switch>
						</div>
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
