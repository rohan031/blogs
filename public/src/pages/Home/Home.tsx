import React, { useState, useContext, useEffect } from "react";
import styles from "./home.module.scss";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import BlogItem from "./component/BlogItem";
import Nav from "../../components/Nav";

interface Blogs {
	author: string;
	blogId: string;
	authorId: string;
	title: string;
	text: string;
	createdAt: string;
}

function Home() {
	const user = useContext(AuthContext);
	const [blogs, setBlogs] = useState<Blogs[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [title, setTitle] = useState<string>("");

	useEffect(() => {
		fetch("/api/blogs")
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				setBlogs(res.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => setLoading(false));
	}, [user]);

	let blogElements: JSX.Element[] = [];
	blogs?.forEach((blog) => {
		let element = (
			<BlogItem
				key={blog.blogId}
				author={blog.author}
				authorId={blog.authorId}
				title={blog.title}
				text={blog.text}
				createdAt={blog.createdAt}
				blogId={blog.blogId}
			/>
		);
		if (blog.title.includes(title)) {
			blogElements.push(element);
		}
	});

	return (
		<div className={styles.home}>
			<Nav />
			<div className="container">
				{loading ? (
					<div className={styles.loading}>Loading...</div>
				) : (
					<div className={styles.container}>
						<div className={styles.search}>
							<input
								type="text"
								placeholder="search"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className={styles.blog}>
							{blogElements.length == 0 ? (
								<div>no blogs</div>
							) : (
								blogElements
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
