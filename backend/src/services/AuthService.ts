import {  PrismaClient, User } from "@prisma/client";
import { AuthResponse, LoginInput, SignupInput } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


  const prisma = new PrismaClient();
export class  AuthService{

  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

  static  async  registerUser(data:SignupInput): Promise<Partial<User>>{

    const existingUser=  await prisma.user.findUnique({
      where:{email:data.email}
    })

    if(existingUser){
      throw  new ApiError(400,"User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user =  await   prisma.user.create({
      data:{
        email:data.email,
        password:hashedPassword,
        role:data.role,
        
      },
     select: {
        id: true,
        email: true,
        role: true,
        createdAt:true,
      }
    })


    return user;

  }


  static async loginUser(data:LoginInput): Promise<AuthResponse>
{
 const user =  await  prisma.user.findUnique({
  where:{email:data.email}
 })
 if(!user){
  throw new ApiError(401,"Invalid email ");
 }

 const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if(!isPasswordValid){
    throw new ApiError(401,"Invalid password");
  }

  const token = jwt.sign(
    {userId:user.id, role:user.role},
    this.JWT_SECRET,
    {expiresIn:'7d'}
  )
  return {
    user:{
      id:user.id,
      email:user.email,
      role:user.role
    },
    token
  }
}}