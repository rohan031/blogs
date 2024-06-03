import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/Notfound/NotFound";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Manage from "./pages/Manage/Manage";
import { AuthContext, User } from "./context/authContext";

const App = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = sessionStorage.getItem("token");

		if (token) {
			fetch("/users", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.error) return;
					let u = {
						userId: res.data[0].userId,
						name: res.data[0].name,
						email: res.data[0].email,
					};
					setUser(u);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, []);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={user}>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="blog/:blogId" element={<Blog />} />
						<Route path="author/:authorId" element={<Profile />} />
						<Route path="auth/login" element={<Login />} />
						<Route path="auth/signup" element={<Signup />} />
						<Route path="manage" element={<Manage />} />

						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
		</BrowserRouter>
	);
};

export default App;
