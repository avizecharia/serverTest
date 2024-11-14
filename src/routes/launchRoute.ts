import { Request, Response } from "express";

import { changeStatusService, createLaunch, getYourDeffenceAttackService, grtYourLauncheService } from "../services/launchService";
import { ILaunche } from "../models/launche";



export const createLaunchRoute = async(req:Request<ILaunche>,res:Response)=>{
    try {
        console.log(req.body,"hererer");
        
        const result = await createLaunch(req.body)
        console.log(result);
        
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
        const result = await changeStatusService(req.params.id,req.body.newstatus,req.body.roketType)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({err:err})
        console.log(err);
    }
}
export const getYourDeffenceAttackRoute = async(req:Request,res:Response)=>{
    try {
        const result = await getYourDeffenceAttackService(req.params.area)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(500).json({
            err
        })
        console.log(err);
    }
}