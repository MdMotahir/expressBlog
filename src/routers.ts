import * as express from 'express';
import { getAllUser, getUser, createUser, updateUser, deleteUser} from './controller/userController';
import { getAllBlogs, createBlog, getBlog } from './controller/blogController';


const router = express.Router();

// GET
router.get('/', (req, res) => {
    res.send('Hello World!');
});

//User Routes
router.get('/users', getAllUser);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//Blog Routes
router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.get('/blogs/:id', getBlog);

export default router;