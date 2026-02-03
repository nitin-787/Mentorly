import { NextFunction ,Request,Response} from "express";
import { AuthService } from "../services/AuthService";
import { LoginInput, SignupInput } from "../types/auth.types";


export  class  AuthController {
 static async signup(
    req: Request<{}, {}, SignupInput>, 
    res: Response, 
    next: NextFunction
  ) {
    try {
      const user = await AuthService.registerUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }


   static async login(
    req:Request<{},{},LoginInput>,
    res:Response,
    next:NextFunction

  ){
    try{
      const AuthResponse = await  AuthService.loginUser(req.body);
      res.status(200).json({success:true,data:AuthResponse});
    }catch(error){
      next(error);
    }
  }
 
}