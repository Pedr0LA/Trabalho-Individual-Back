import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import auth from "../config/auth"
import { Mailer } from '../config/mailer';

async function emailCadastro(emailUsuario: string) {
    const assunto = "Bem-vindo!";
    const mensagem = "Parabéns por cadastrar-se!";

    try {
        await Mailer.sendEmail(emailUsuario, assunto, mensagem);
    } catch (error) {
        console.error("Falha ao enviar e-mail de cadastro:", error);
    }
}

const prisma = new PrismaClient()

export class UsuarioController{

    public static async createUsuario(req: Request, res: Response){

        try {
            const {nomeCompleto, numeroTelefone, endereco, email, password, isVendedor} = req.body
            const {hash, salt} = auth.generatePassword(password)
            
            const usuarioCreateInput: Prisma.UsuarioCreateInput = {
                nomeCompleto: nomeCompleto,
                numeroTelefone: numeroTelefone,
                endereco: endereco,
                email: email,
                hash: hash,
                salt: salt,
                isVendedor: isVendedor
            }

            const createdUsuario = await prisma.usuario.create({
                data: usuarioCreateInput
            })

            const token = auth.generateJWT(createdUsuario)

            emailCadastro(createdUsuario.email)

            res.status(201).json({usuario: createdUsuario, token: token})

        } catch (error: any) {
            res.status(500).json({message: error.message})
        }

    }

    public static async readUsuario(req: Request, res: Response){
        
        try {
            
            const usuarioId = req.user

            console.log(usuarioId)

            const foundUsuario = await prisma.usuario.findUnique({
                where: {
                    id: String(usuarioId)
                }
            })

            if(!foundUsuario){
                res.status(404).json({message: "Usuário não encontrado"})

                return
            }

            return res.status(200).json(foundUsuario)

        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async readAllUsuarios(req: Request, res: Response){

        try {
            
            const foundUsuarios = await prisma.usuario.findMany()

            return res.status(200).json(foundUsuarios)

        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async updateUsuario(req: Request, res: Response){
        
        try {

            const usuarioId = req.user
            const {nomeCompleto, numeroTelefone, endereco, email, password, isVendedor} = req.body

            
            const usuarioUpdateInput: Prisma.UsuarioUpdateInput = {
                nomeCompleto: nomeCompleto,
                numeroTelefone: numeroTelefone,
                endereco: endereco,
                email: email,
                isVendedor: isVendedor
            }

            if (password) {
                const { hash, salt } = auth.generatePassword(password)
                usuarioUpdateInput.hash = hash
                usuarioUpdateInput.salt = salt
            }

            const updatedUsuario = await prisma.usuario.update({
                data: usuarioUpdateInput,
                where: {
                    id: String(usuarioId)
                }
            })

            res.status(200).json(updatedUsuario)
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async deleteUsuario(req: Request, res: Response){
        
        try {
            
            const usuarioId = req.user

            const deletedUsuario = await prisma.usuario.delete({
                where: {
                    id: String(usuarioId)
                }
            })

            res.status(200).json(deletedUsuario)

        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    static async login(request: Request, response: Response) {


        try {
            
            const {email, password} = request.body
    
            const user = await prisma.usuario.findUnique({
                where:{ email: email}
            });

            if(!user)
                return response.status(400).json({message:"usuário não existe"})

            const {hash, salt} = user

            if(!auth.checkPassword(password, hash, salt)){
                return response.status(400).json({message:"Senha incorreta"})
            }
            const token = auth.generateJWT(user)
    
            return response.status(201).json({message:"Token enviado" ,token: token})

        } catch (error) {
            return response.status(500).json({message: "Server Error"})

        }
    }

}