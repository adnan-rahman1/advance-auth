const { Router } = require("express");
const { signUp, signIn, test, home, signOut, accountActivation } = require("../../controllers/auth");
const {
  signUpValidationRule,
  signInValidationRule,
  validationError
} = require("../../validation/auth");

const router = Router();

router.post("/signup", signUpValidationRule, validationError, signUp);
router.post("/account-activation", accountActivation);

router.post("/signin", signInValidationRule, validationError, signIn);
router.get("/home", home);
router.get('/test', test);
router.post("/signout", signOut);

module.exports = router;
