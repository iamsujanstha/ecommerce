import express, { Request, Response } from 'express';
import { authMiddleware, loginUser, logoutUser, registerUser } from '../controllers/auth/auth-controller'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', authMiddleware, (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: 'Authenticated User',
    data: user
  })
})
router.post('/logout', logoutUser);

export default router;