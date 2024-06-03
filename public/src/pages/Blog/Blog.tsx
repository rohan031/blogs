import React, { useContext, useEffect, useState } from "react";
import styles from "./blog.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import { AuthContext } from "../../context/authContext";

interface BlogData {
	author: string;
	blogId: string;
	authorId: string;
	title: string;
	text: string;
	createdAt: string;
}

interface Comment {
	userName: string;
	commentId: string;
	text: string;
	createdAt: string;
	userId: string;
}

function Blog() {
	let { state } = useLocation();
	const { blogId } = useParams();
	const [blogData, setBlogData] = useState<BlogData | null>(null);
	const [loading, setLoading] = useState(true);
	const user = useContext(AuthContext);

	const [comments, setComments] = useState<Comment[] | null>(null);
	const [commentText, setCommentText] = useState("");

	useEffect(() => {
		if (state) {
			setBlogData(state);
			setLoading(false);
		} else {
			let url = `/blogs/${blogId}`;
			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					if (res.error) return;
					setBlogData(res.data[0]);
				})
				.catch((err) => console.error(err))
				.finally(() => setLoading(false));
		}

		fetchComment();
	}, []);

	let d = new Date();
	if (blogData?.createdAt) {
		d = new Date(blogData.createdAt);
	}

	const fetchComment = () => {
		let url = `/comment/${blogId}`;
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				if (res.error) return;
				console.log(res);
				setComments(res.data);
			})
			.catch((err) => console.error(err));
	};

	const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let text = commentText;
		console.log(text);
		let url = `/comment/${blogId}`;
		let token = sessionStorage.getItem("token");
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: commentText }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.error) return;

				setCommentText("");
				fetchComment();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className={styles.blog}>
			<Nav />

			<div className="container">
				{loading ? (
					<div className={styles.loading}>Loading...</div>
				) : (
					<div className={styles.content}>
						<h1>{blogData?.title}</h1>

						<div className={styles.details}>
							<Link to={`/author/${blogData?.authorId}`}>
								{blogData?.author}
							</Link>
							<p>{d.toDateString()}</p>
						</div>

						<div className={styles.text}>{blogData?.text}</div>

						<div className={styles.comment}>
							<h2>Comments</h2>

							{user ? (
								<form onSubmit={handlePostComment}>
									<input
										type="text"
										placeholder="comment..."
										required
										value={commentText}
										onChange={(e) =>
											setCommentText(e.target.value)
										}
									/>

									<button>Post</button>
								</form>
							) : (
								<div>
									<Link to="/auth/login">Login</Link> to
									comment.
								</div>
							)}

							{!comments || comments.length == 0 ? (
								<div>No comments</div>
							) : (
								comments?.map((comment) => {
									let d = new Date(comment.createdAt);
									return (
										<div
											className={styles.comment_item}
											key={comment.commentId}
										>
											<div
												className={
													styles.comment_author
												}
											>
												<Link
													to={`/author/${comment.userId}`}
												>
													{comment.userName}
												</Link>

												<p>{d.toDateString()}</p>
											</div>

											<p
												className={
													styles.comment_content
												}
											>
												{comment.text}
											</p>
										</div>
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

export default Blog;
