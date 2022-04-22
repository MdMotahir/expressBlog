import * as express from 'express';
import { getAllUser, getUser, createUser, updateUser, deleteUser} from './controller/userController';
import { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog } from './controller/blogController';
import {login, verifyAuth} from './controller/authController';
import { body, check } from 'express-validator';

const router = express.Router();





// GET
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Auth
router.post('/login',
    body('email').isEmail(),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    login
);

//User Routes
router.get('/users',verifyAuth ,getAllUser);
router.get('/users/:id',verifyAuth, getUser);
router.post('/users',
    body('email').isEmail(),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    verifyAuth,
    createUser
);
router.patch('/users/:id',verifyAuth, updateUser);
router.delete('/users/:id',verifyAuth, deleteUser);

//Blog Routes
router.get('/blogs',verifyAuth, getAllBlogs);
router.post('/blogs',
    check('title').isLength({ min: 10 }).withMessage('Title must be at least 10 chars long'),
    check('content').isLength({ min: 50 }).withMessage('Content must be at least 50 chars long'),
    verifyAuth,
    createBlog
);
router.get('/blogs/:id',verifyAuth, getBlog);
router.patch('/blogs/:id',verifyAuth, updateBlog);
router.delete('/blogs/:id',verifyAuth, deleteBlog);

export default router;