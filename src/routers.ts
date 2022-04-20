import * as express from 'express';
import { getAllUser, getUser, createUser, updateUser, deleteUser} from './controller/userController';
import { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog } from './controller/blogController';
import {login, verifyAuth} from './controller/authController';


const router = express.Router();





// GET
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Auth
router.post('/login', login);

//User Routes
router.get('/users',verifyAuth ,getAllUser);
router.get('/users/:id',verifyAuth, getUser);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//Blog Routes
router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.get('/blogs/:id', getBlog);
router.patch('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

export default router;