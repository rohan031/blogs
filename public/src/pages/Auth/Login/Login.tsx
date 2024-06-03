import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

function Login() {
	const user = useContext(AuthContext);

	const [userInput, setUserInput] = useState({
		email: "",
		password: "",
	});
	const [err, setErr] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let key = e.target.name;
		let value = e.target.value;

		setUserInput((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userInput.email,
				password: userInput.password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					throw new Error(res.message);
				}

				const { accessToken } = res.data;
				sessionStorage.setItem("token", accessToken);
				// navigate("/");
				window.location.reload();
			})
			.catch((err) => {
				console.error(err);
				setErr(err.message);
			});
	};

	return (
		<div className={styles.login}>
			<form onSubmit={handleSubmit}>
				<div className={styles.input}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="email..."
						value={userInput.email}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className={styles.input}>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="password..."
						value={userInput.password}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className={styles.button}>
					<button type="submit">Login</button>
				</div>

				{err && <p className={styles.error}>{err}</p>}

				<div className={styles.link}>
					<Link to="/auth/signup">Signup</Link>

					<Link to="/">Home</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;
