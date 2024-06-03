import React, { useState } from "react";
import styles from "../manage.module.scss";

interface CreateBlogProps {
	handleClose: () => void;
	fetchDetail: () => void;
}

const CreateBlog = ({ handleClose, fetchDetail }: CreateBlogProps) => {
	const [blogContent, setBlogContent] = useState({
		title: "",
		text: "",
	});

	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let token = sessionStorage.getItem("token");
		fetch("/api/blogs", {
			method: "POST",
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
				fetchDetail();
				handleClose();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className={styles.blogCreate}>
			<form onSubmit={handleCreate}>
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
					<button type="submit">Create</button>

					<button type="reset" onClick={handleClose}>
						Close
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateBlog;
