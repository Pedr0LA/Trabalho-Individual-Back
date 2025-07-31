import z from "zod"

const usuario = z.object({
    nomeCompleto: z.string("Nome deve ser uma string").trim(),
    numeroTelefone: z.string("Número de telefone deve ser uma string").trim(),
    endereco: z.string("Endereço deve ser uma string").trim(),
    email: z.email("Email inválido"),
    password: z.string("Sua senha deve ser uma string"),
    isVendedor: z.boolean("isVendedor deve ser um boolean")
})

const createUsuario = usuario

const updateUsuario = usuario.partial()

const loginUsuario = usuario.pick({
    email: true,
    password: true
})

const usuarioParams = z.object({
    usuarioId: z.uuid("Sua Id de usuario deve ser no formato de uuid")
})

export default{
    createUsuario,
    updateUsuario,
    usuarioParams,
    loginUsuario
}