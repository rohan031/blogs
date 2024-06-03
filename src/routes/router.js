const { signup, login } = require("../controllers/auth");

const router = require("express").Router();

const privateRouter = require("express").Router();
const publicRouter = require("express").Router();

// auth end points
publicRouter.post("/auth/signup", signup);
publicRouter.post("/auth/login", login);

router.use(privateRouter);
router.use(publicRouter);

module.exports = router;
