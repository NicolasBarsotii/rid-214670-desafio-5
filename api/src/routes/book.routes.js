import bookController from "../controller/book.controller.js";
import { Router } from "express";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";
import { validate, validateBookId } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get('/', bookController.findAllBooksController)

router.use(authMiddlewares)
router.post(
    '/',
    validate(bookSchema),
    authMiddlewares,
    bookController.createBookController)

router.get('/search', bookController.searchBooksController)

router.get('/:id', validateBookId, bookController.findAllBooksController)

router.patch('/:id', validateBookId, bookController.updateBookController)

router.delete('/:id', validateBookId, bookController.deleteBookController)


export default router