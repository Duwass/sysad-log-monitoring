import express from "express";
import {userRegister, userLogin,getAllUsers} from "../controllers/users.controller";

const router = express.Router();
router.get("/user/list",getAllUsers);
router.post('/register', userRegister);
router.post('/login', userLogin);
export default router;