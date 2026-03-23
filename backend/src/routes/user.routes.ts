import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/all', getUsers);
// router.post('/users', createUser); 

export default router;