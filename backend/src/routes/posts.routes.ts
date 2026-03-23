import { Router } from 'express';
import { getPosts } from '../controllers/posts.controller';

const router = Router();

router.get('/all', getPosts);
// router.post('/users', createUser); 

export default router;