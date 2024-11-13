import { Request, Response } from "express";
import { RegisterDto } from "../types/Dto/register";
import { createNewUser, userLoginService } from "../services/userService";
import { LoginDto } from "../types/Dto/loginDto";





export const registerRoute = async(req:Request<RegisterDto>,res:Response)=>{
    try {
        const result = await createNewUser(req.body)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({
            err
        })
        console.log(err);
    }
}

export const loginRoute = async(req:Request<LoginDto>,res:Response)=>{
    try {
        const result =  await userLoginService(req.body)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({err})
    }
}