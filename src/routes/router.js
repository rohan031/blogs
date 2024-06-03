const { signup, login } = require("../controllers/auth");
const {
	getBlogs,
	getBlogById,
	postBlog,
	putBlog,
	deleteBlog,
} = require("../controllers/blogs");
const {
	getCommentByBlogId,
	postCommentByBlogId,
} = require("../controllers/comment");
const { getUserById, putUser } = require("../controllers/user");
const {
	verifyToken,
	verifyPermissionBlogs,
	verifyPermissionUser,
} = require("../middleware/auth");

const router = require("express").Router();

const privateRouter = require("express").Router();
const publicRouter = require("express").Router();

privateRouter.use(verifyToken);

// auth end points
publicRouter.post("/auth/signup", signup);
publicRouter.post("/auth/login", login);

// user endpoints
publicRouter.get("/users/:userId", getUserById);
privateRouter.put("/users/:userId", verifyPermissionUser, putUser);

// blog endpoins
publicRouter.get("/blogs", getBlogs);
publicRouter.get("/blogs/:blogId", getBlogById);
privateRouter.post("/blogs", postBlog);
privateRouter.put("/blogs/:blogId", verifyPermissionBlogs, putBlog);
privateRouter.delete("/blogs/:blogId", verifyPermissionBlogs, deleteBlog);

// comment endpoints
publicRouter.get("/comment/:blogId", getCommentByBlogId);
privateRouter.post("/comment/:blogId", postCommentByBlogId);

router.use(publicRouter);
router.use(privateRouter);

module.exports = router;
