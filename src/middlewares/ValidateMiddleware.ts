import z from "zod"
import {Request, Response, NextFunction, response} from "express"

export function validateBody<T>(schema: z.ZodSchema<T>){
    return(req: Request, res: Response, next: NextFunction) =>{

        const validacao = schema.safeParse(req.body)

        if(validacao.error){
            res.status(400).json({errors: z.treeifyError(validacao.error)})

            return
        }

        next()
    }
}

export function validateParams<T>(schema: z.ZodSchema<T>){
    return(req: Request, res: Response, next: NextFunction) =>{

        const validacao = schema.safeParse(req.params)

        if(validacao.error){
            res.status(400).json({errors: z.treeifyError(validacao.error)})

            return
        }

        next()
    }
}