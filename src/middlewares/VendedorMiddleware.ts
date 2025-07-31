import { Request, Response, NextFunction } from 'express';
import {PrismaClient} from "../generated/prisma"

const prisma = new PrismaClient()

export async function isVendedor(req: Request, res: Response, next: NextFunction) {

    try {
        const usuarioId = req.user

    const usuario = await prisma.usuario.findUnique({
        where: {
            id: String(usuarioId)
        }
    })

    if(!usuario){
        return res.status(404).json({ error: 'Usuário não encontrado.' })
    }

    if(!usuario.isVendedor){
        return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para vender produtos.'})
    } 

    next();
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}