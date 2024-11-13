import { Request, Response } from "express";

import { createLaunch } from "../services/launchService";
import { ILaunche } from "../models/launche";
import { changeStatusService, grtYourLauncheService } from "../services/userService";



export const createLaunchRoute = async(req:Request<ILaunche>,res:Response)=>{
    try {
        const result = await createLaunch(req.body,req.body.type)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({
            err
        })
        console.log(err);
    }
}
export const grtYourLauncheRoute = async(req:Request,res:Response)=>{
    try {
        const result = await grtYourLauncheService(req.params.id)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({
            err
        })
        console.log(err);
    }
}
export const changeStatus = async(req:Request,res:Response)=>{
    try {
        const result = await changeStatusService(req.params.id,req.body.newstatus)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({
            err
        })
        console.log(err);
    }
}