import {Router} from "express"
import { UsuarioController } from "../controllers/UsuarioController"
import { ProdutoController } from "../controllers/ProdutoController"
import { validateBody, validateParams } from "../middlewares/ValidateMiddleware"
import UsuarioValidator from "../config/UsuarioValidator"
import ProdutoValidator from "../config/ProdutoValidator"
import passport from "passport"
import { isVendedor } from "../middlewares/VendedorMiddleware"
import { photoUpload } from "../config/uploader"

const router = Router()

// UsuarioRoutes

router.post("/cadastro", validateBody(UsuarioValidator.createUsuario), UsuarioController.createUsuario)

router.get("/me", passport.authenticate("jwt", { session: false }), UsuarioController.readUsuario)

router.get("/usuarios", passport.authenticate("jwt", { session: false }), UsuarioController.readAllUsuarios)

router.put("/update", validateBody(UsuarioValidator.updateUsuario), passport.authenticate("jwt", { session: false }),  UsuarioController.updateUsuario)

router.delete("/usuario", passport.authenticate('jwt', {session: false}), UsuarioController.deleteUsuario)

router.post("/login", validateBody(UsuarioValidator.loginUsuario), UsuarioController.login)

//ProdutoRoutes

router.post("/produto", passport.authenticate("jwt", { session: false }), isVendedor, validateBody(ProdutoValidator.createProduto), ProdutoController.createProduto)

router.get("/produto/:produtoId", validateParams(ProdutoValidator.produtoParams), ProdutoController.readProduto)

router.get("/produtos", ProdutoController.readAllProdutos)

router.put("/produto/:produtoId", validateBody(ProdutoValidator.updateProduto), validateParams(ProdutoValidator.produtoParams), passport.authenticate("jwt", { session: false }),ProdutoController.updateProduto)

router.delete("/produto/:produtoId", validateParams(ProdutoValidator.produtoParams), passport.authenticate("jwt", { session: false }), ProdutoController.deleteProduto)

router.post("/produto/img", photoUpload.single("image"))

export default router