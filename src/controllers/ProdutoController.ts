import { Prisma, PrismaClient } from "../generated/prisma";
import { Request, response, Response } from "express";

const prisma = new PrismaClient()

export class ProdutoController{

    public static async createProduto(req: Request, res: Response){

        try {

            const vendedorId = req.user
            const {modelo, dataFabricacao, condicao, status, preco} = req.body

            const createProdutoInput: Prisma.ProdutoCreateInput = {
                modelo: modelo,
                dataFabricacao: dataFabricacao,
                condicao: condicao,
                status: status,
                preco: preco,
                vendedor:{
                    connect:{
                        id: String(vendedorId)
                    }
                }
            }

            const createdProduto = await prisma.produto.create({
                data: createProdutoInput
            })

            res.status(201).json(createdProduto)
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async readProduto(req: Request, res: Response){

        try {

            const {produtoId} = req.params

            const foundProduto = await prisma.produto.findUnique({
                where: {
                    id: produtoId
                }
            })

            if(!foundProduto){
                res.status(404).json({message: "Produto não encontrado"})

                return
            }

            res.status(200).json(foundProduto)
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async readAllProdutos(req: Request, res: Response){

        try {

            const foundProdutos = await prisma.produto.findMany()

            res.status(200).json(foundProdutos)
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async updateProduto(req: Request, res: Response){

        try {
            
            const vendedorId = req.user
            const {produtoId} = req.params
            const {modelo, dataFabricacao, condicao, status, preco} = req.body

            const produtoUpdateInput: Prisma.ProdutoUpdateInput = {
                modelo: modelo,
                dataFabricacao: dataFabricacao,
                condicao: condicao,
                status: status,
                preco: preco
                }

            const updatedProduto = await prisma.produto.update({
                data: produtoUpdateInput,
                where:{
                    id: produtoId,
                    vendedorId: String(vendedorId)
                }
            })

            res.status(201).json(updatedProduto)
          
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    public static async deleteProduto(req: Request, res: Response){

        try {

            const vendedorId = req.user
            const {produtoId} = req.params

            const deletedProduto = await prisma.produto.delete({
                where: {
                    id: produtoId,
                    vendedorId: String(vendedorId)
                }
            })

            res.status(200).json(deletedProduto)
            
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }
}