import React, { useContext, useRef, useState } from "react";
import styles from "./blogItem.module.scss";
import { Link } from "react-router-dom";

interface BlogItemProps {
	author: string;
	authorId: string;
	title: string;
	text: string;
	createdAt: string;
	blogId: string;
	shouldDelete?: boolean;
	handleDelete?: (blogId: string) => void;
	fetchDetail?: () => void;
}
const BlogItem = ({
	author,
	authorId,
	title,
	text,
	createdAt,
	blogId,
	shouldDelete = false,
	handleDelete,
	fetchDetail,
}: BlogItemProps) => {
	let d = new Date(createdAt);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const [blogContent, setBlogContent] = useState({
		title: title,
		text: text,
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let token = sessionStorage.getItem("token");
		let url = `/api/blogs/${blogId}`;
		fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: blogContent.title,
				text: blogContent.text,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				console.log(res);
				if (fetchDetail) fetchDetail();
				handleClose();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleClose = () => {
		modalRef.current?.close();
	};

	return (
		<div className={styles.blog_item}>
			<dialog ref={modalRef}>
				<div className={styles.blogCreate}>
					<form onSubmit={handleUpdate}>
						<input
							type="text"
							required
							placeholder="title..."
							value={blogContent.title}
							onChange={(e) =>
								setBlogContent((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
						/>

						<textarea
							required
							placeholder="text..."
							value={blogContent.text}
							onChange={(e) =>
								setBlogContent((prev) => ({
									...prev,
									text: e.target.value,
								}))
							}
						/>

						<div>
							<button type="submit">Update</button>

							<button type="reset" onClick={handleClose}>
								Close
							</button>
						</div>
					</form>
				</div>
			</dialog>

			<h2>{title}</h2>

			<div className={styles.blog_detail}>
				<Link to={`/author/${authorId}`}>{author}</Link>
				<p>{d.toDateString()}</p>
			</div>

			<p className={styles.text}>{text}</p>

			<div className={styles.link}>
				<Link
					to={`/blog/${blogId}`}
					state={{
						author,
						authorId,
						title,
						text,
						createdAt,
						blogId,
					}}
				>
					Read
				</Link>
			</div>

			{shouldDelete && handleDelete && (
				<div className={styles.button}>
					<button onClick={() => modalRef.current?.showModal()}>
						Edit
					</button>
					<button onClick={() => handleDelete(blogId)}>Delete</button>
				</div>
			)}
		</div>
	);
};

export default BlogItem;
