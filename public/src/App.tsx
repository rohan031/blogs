import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/Notfound/NotFound";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Manage from "./pages/Manage/Manage";
import { AuthContext } from "./context/authContext";

const App = () => {
	const [auth, setAuth] = useState<boolean>(false);

	useEffect(() => {
		const token = sessionStorage.getItem("token");

		if (token) setAuth(true);
	}, []);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={auth}>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="blog/:blogId" element={<Blog />} />
						<Route path="profile" element={<Profile />} />
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
