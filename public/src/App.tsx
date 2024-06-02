import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/Notfound/NotFound";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Manage from "./pages/Manage/Manage";

const App = () => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default App;
