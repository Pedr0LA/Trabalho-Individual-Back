-- CreateEnum
CREATE TYPE "Condicao" AS ENUM ('Novo', 'Seminovo', 'Usado');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Reservado', 'Disponivel');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "numeroTelefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVendedor" BOOLEAN NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "dataFabricacao" TIMESTAMP(3) NOT NULL,
    "condicao" "Condicao" NOT NULL,
    "status" "Status" NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "idVendedor" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_idVendedor_fkey" FOREIGN KEY ("idVendedor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
