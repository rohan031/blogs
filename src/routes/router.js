const { signup, login } = require("../controllers/auth");
const { getBlogs, getBlogById } = require("../controllers/blogs");
const getCommentByBlogId = require("../controllers/comment");
const { getUserById } = require("../controllers/user");

const router = require("express").Router();

const privateRouter = require("express").Router();
const publicRouter = require("express").Router();

// auth end points
publicRouter.post("/auth/signup", signup);
publicRouter.post("/auth/login", login);

// user endpoints
publicRouter.get("/users/:userId", getUserById);

// blog endpoins
publicRouter.get("/blogs", getBlogs);
publicRouter.get("/blogs/:blogId", getBlogById);

// comment endpoints
publicRouter.get("/comment/:blogId", getCommentByBlogId);

router.use(privateRouter);
router.use(publicRouter);

module.exports = router;
