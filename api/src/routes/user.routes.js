import { Router } from "express";
import userController from "../controller/user.controllers.js";
import {validate, validateUserId} from '../middlewares/validation.middlewares.js'
import { userSchema } from "../schema/user.schema.js";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post('/', 
    validate(userSchema),
    userController.createUSerController)

router.post('/login', 
    userController.loginUSerController)

    router.use(authMiddlewares);
    router.get('/', userController.findAllUserController)

    router.get('/:id',validateUserId, userController.findUserByIdController)
    
    router.patch('/:id',validateUserId, userController.updateUserController);

    router.delete('/:id',validateUserId, userController.deleteUserController)
export default router