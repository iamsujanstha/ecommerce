import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
//register


const registerUser = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName, email, password
    })

    await newUser.save();
    res.status(200).json({
      success: true,
      message: 'Registration Successful'
    })
  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

//login
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try { }
  catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

//logout

//auth middleware

export { registerUser, loginUser }