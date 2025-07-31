import z from "zod"

const produto = z.object({
    modelo: z.string("O modelo deve ser uma string").trim(),
    dataFabricacao: z.string("Sua data de fabricação deve estar no formato padrão do javascript"),
    condicao: z.enum(["Novo", "Seminovo", "Usado"]),
    status: z.enum(["Reservado", "Disponivel"]),
    preco: z.number("Seu preço deve ser um número").positive("Seu preço deve ser positivo"),
})

const createProduto = produto

const updateProduto = produto.partial()

const produtoParams = z.object({
    produtoId: z.uuid("Seu id de produto deve ser no formato de uuid")
})

export default{
    createProduto,
    updateProduto,
    produtoParams
}