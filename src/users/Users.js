import React, { Component } from "react";
import UserItem from "./UserItem";

class Users extends Component {
	state = {
		users: [
			{
				id: "1",
				login: "ezmobius",
				avatar_url: "https://avatars0.githubusercontent.com/u/5?v=4",
				html_url: "https://github.com/ezmobius",
			},
			{
				id: "2",
				login: "ivey",
				avatar_url: "https://avatars0.githubusercontent.com/u/6?v=4",
				html_url: "https://github.com/ivey",
			},
			{
				id: "3",
				login: "evanphx",
				avatar_url: "https://avatars0.githubusercontent.com/u/7?v=4",
				html_url: "https://github.com/evanphx",
			},
		],
	};
	render() {
		return (
			<div style={userStyle}>
				{this.state.users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
}

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem",
};

export default Users;
