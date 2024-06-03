import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import BlogItem from "../Home/component/BlogItem";

interface Blogs {
	id: string;
	title: string;
	text: string;
	createdAt: string;
}

interface Author {
	name: string;
	blogs: Blogs[];
}

function Profile() {
	const [loading, setLoading] = useState(true);
	const { authorId } = useParams();
	const [author, setAuthor] = useState<Author | null>(null);

	useEffect(() => {
		let url = `/users/${authorId}`;
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				setAuthor(res.data[0]);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className={styles.profile}>
			<Nav />
			<div className="container">
				{loading ? (
					<div className={styles.loading}>Loading...</div>
				) : (
					<div className={styles.profile}>
						<h1>{author?.name}</h1>

						<div className={styles.blogs}>
							{author?.blogs.length == 0 ? (
								<>No blogs here</>
							) : (
								author?.blogs.map((blog) => {
									let authId = authorId;
									if (!authId) authId = blog.id;

									return (
										<BlogItem
											key={blog.id}
											author={author.name}
											authorId={authId}
											title={blog.title}
											text={blog.text}
											createdAt={blog.createdAt}
											blogId={blog.id}
										/>
									);
								})
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
