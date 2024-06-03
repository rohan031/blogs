import React from "react";
import styles from "../home.module.scss";
import { Link } from "react-router-dom";

interface BlogItemProps {
	author: string;
	authorId: string;
	title: string;
	text: string;
	createdAt: string;
	blogId: string;
}
const BlogItem = ({
	author,
	authorId,
	title,
	text,
	createdAt,
	blogId,
}: BlogItemProps) => {
	let d = new Date(createdAt);

	return (
		<div className={styles.blog_item}>
			<h2>{title}</h2>

			<div className={styles.blog_detail}>
				<Link to={`author/${authorId}`}>{author}</Link>
				<p>{d.toDateString()}</p>
			</div>

			<p className={styles.text}>{text}</p>

			<Link to={`blog/${blogId}`}>Read</Link>
		</div>
	);
};

export default BlogItem;
