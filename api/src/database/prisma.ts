import { PrismaClient } from ".prisma/client"

// Gerar Prisma Client para evitar cache do Vercel
const prisma = new PrismaClient({
  log: ["query"],
})

export { prisma }
