import z from "zod"

const usuario = z.object({
    nomeCompleto: z.string("Nome deve ser uma string").trim(),
    numeroTelefone: z.string("Número de telefone deve ser uma string").trim(),
    endereco: z.string("Endereço deve ser uma string").trim(),
    email: z.email("Email inválido"),
    password: z.string("Sua senha deve ser uma string")
    .min(8, {message: "A senha deve ter no mínimo 8 caracteres"})
    .regex(/[A-z]/, {message: "A senha deve conter ao menos uma letra"})
    .regex(/\d/, "A senha deve conter ao menos um número"),
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