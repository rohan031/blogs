import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Nav = () => {
	const user = useContext(AuthContext);

	return (
		<nav className="nav">
			<div className="container">
				{user ? (
					<>
						<Link to={`/manage`}>{user.name}</Link>
					</>
				) : (
					<>
						<Link to="/auth/login">Login</Link>
						<Link to="/auth/signup">Signup</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
