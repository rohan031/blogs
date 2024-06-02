const router = require("express").Router();

const privateRouter = require("express").Router();
const publicRouter = require("express").Router();

router.use(privateRouter);
router.use(publicRouter);

module.exports = router;
