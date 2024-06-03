const { signup, login } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const router = require("express").Router();

const privateRouter = require("express").Router();
const publicRouter = require("express").Router();

// auth end points
publicRouter.post("/auth/signup", signup);
publicRouter.post("/auth/login", login);

// user endpoints
publicRouter.get("/users/:userId", getUserById);

router.use(privateRouter);
router.use(publicRouter);

module.exports = router;
