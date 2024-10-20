import express from "express";
import {userRegister, userLogin} from "../controllers/users.controller";

const router = express.Router();

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

export default router;