/**
 * @desc handle the auth operations
 * @route api/v1/auth
 */
const { Router } = require("express");
const AuthController = require("../controller/auth.controller");

const router = Router();

router.post(
  "/register",
  AuthController.registerValidator,
  AuthController.register
);
router.post("/login", AuthController.loginValidator, AuthController.login);
router.get("/refresh", AuthController.refreshValidator, AuthController.refresh);
router.delete("/logout", AuthController.logoutValidator, AuthController.logout);

module.exports = router;
