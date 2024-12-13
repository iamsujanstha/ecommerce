import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { DecodedToken } from '../../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register User
const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userName, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({
        success: false,
        message: "User already exists!",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: 'Registration successful',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration.',
    });
  }
};

// Login User
const loginUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User does not exist.',
      });
      return; // No need to return response, just end function here
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password incorrect"); // Log for debugging
      res.status(404).json({
        success: false,
        message: 'Incorrect Password',
      });
      return; // Ensure it stops further execution
    }


    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, { httpOnly: true, secure: true, path: '/', sameSite: 'lax' }).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (e) {
    console.error('Error during login:', e); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
};



// Logout User (for token-based auth, logout is often handled client-side)
const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully'
  })
};


// Auth Middleware to Protect Routes
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers.authorization?.split(' ')[1]; //only when client send the token through authorization header
  const token = req.cookies.token;
  console.log(req.cookies)
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized user!',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded;  // req.user will be of type DecodedToken
    next();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
