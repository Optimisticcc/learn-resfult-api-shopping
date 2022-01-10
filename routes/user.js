const router = require("express-promise-router")();
const UserController = require("../controllers/user");
router.route("/signup").post(UserController.signUp);
router.route("/login").post(UserController.signIn);
module.exports = router;
