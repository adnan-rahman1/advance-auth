import express from 'express';
import { signUp } from "../../controllers/auth";
import { validationRule, validationError } from "../../validation/auth";

const router = express.Router()


router.post('/signup', validationRule, validationError, signUp);

export default router;