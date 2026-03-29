import app from "./src/server"
import { VercelRequest, VercelResponse } from '@vercel/node'

// Teste de conexão direto na raiz para a gente ter certeza
app.get('/debug-prisma', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    await prisma.$connect()
    const count = await prisma.category.count()
    await prisma.$disconnect()
    res.json({ connection: 'SUCCESS', categories_count: count })
  } catch (error: any) {
    res.json({ connection: 'FAILED', error: error.message })
  }
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res)
}