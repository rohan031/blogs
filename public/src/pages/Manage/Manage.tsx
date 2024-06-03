import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./manage.module.scss";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import BlogItem from "../Home/component/BlogItem";
import CreateBlog from "./components/CreateBlog";

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

function Manage() {
	const user = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [author, setAuthor] = useState<Author | null>(null);

	const createBlogRef = useRef<HTMLDialogElement | null>(null);
	const updateUserRef = useRef<HTMLDialogElement | null>(null);

	const [name, setName] = useState(user?.name);

	useEffect(() => {
		if (!user) navigate("/auth/login", { replace: true });
		fetchDetail();
	}, [user]);

	const fetchDetail = () => {
		let url = `/api/users/${user?.userId}`;
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
	};

	const handleDelete = (blogId: string) => {
		let token = sessionStorage.getItem("token");

		let url = `/api/blogs/${blogId}`;
		fetch(url, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				fetchDetail();
			})
			.catch((err) => console.error(err));
	};

	const handleClose = () => {
		createBlogRef.current?.close();
	};

	const handleUpdateName = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let token = sessionStorage.getItem("token");

		let url = `/api/users/${user?.userId}`;
		fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				fetchDetail();
				handleClose();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<div className={styles.manage}>
				<dialog ref={createBlogRef}>
					<CreateBlog
						fetchDetail={fetchDetail}
						handleClose={handleClose}
					/>
				</dialog>

				<dialog ref={updateUserRef}>
					<form onSubmit={handleUpdateName}>
						<input
							type="text"
							required
							placeholder="name..."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<div>
							<button>Update</button>
						</div>
					</form>
				</dialog>

				<Nav />

				<div className="container">
					{loading ? (
						<div className={styles.loading}>Loading...</div>
					) : (
						<div className={styles.profile}>
							<h1>{author?.name}</h1>

							<div className={styles.action}>
								<button
									onClick={() => {
										updateUserRef.current?.showModal();
									}}
								>
									Edit user
								</button>

								<button
									onClick={() => {
										createBlogRef.current?.showModal();
									}}
								>
									Create Blog
								</button>
							</div>

							<div className={styles.blogs}>
								{author?.blogs.length == 0 ? (
									<>No blogs here</>
								) : (
									author?.blogs.map((blog) => {
										return (
											<BlogItem
												key={blog.id}
												author={author.name}
												// @ts-ignore
												authorId={user?.userId}
												title={blog.title}
												text={blog.text}
												createdAt={blog.createdAt}
												blogId={blog.id}
												shouldDelete={true}
												handleDelete={handleDelete}
												fetchDetail={fetchDetail}
											/>
										);
									})
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Manage;
