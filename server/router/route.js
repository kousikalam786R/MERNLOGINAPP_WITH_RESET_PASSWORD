import { Router } from "express";

const router = Router();
//*import all controller /
import * as controller from "../controller/appController.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controller/mailer.js";

/** POST Method */
//router.route("/register").post((req, res) => res.json("register Route"));

router.route("/register").post(controller.register);
//router.route("/register").post((req, res) => res.json("register Route"));
router.route("/registerMail").post(registerMail);
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

//** GET Method */
router.route("/user/:username").get(controller.getUser);
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

//**Put Method */
router.route("/updateUser").put(Auth, controller.updateUser);
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);

export default router;
