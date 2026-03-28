import { VercelRequest, VercelResponse } from '@vercel/node'
import express from 'express'

// Criar app Express para cada requisição
const app = express()

// Middlewares básicos
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Debug endpoint para verificar environment
app.get('/debug-env', (req, res) => {
  res.json({ 
    database_url: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
    node_env: process.env.NODE_ENV,
    has_prisma: !!require('@prisma/client')
  })
})

// Debug Prisma connection
app.get('/debug-prisma', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    // Testar conexão
    await prisma.$connect()
    console.log('Prisma conectado com sucesso!')
    
    // Contar categories
    const count = await prisma.category.count()
    const categories = await prisma.category.findMany({ take: 3 })
    
    await prisma.$disconnect()
    
    res.json({ 
      connection: 'SUCCESS',
      count: count,
      sample: categories
    })
  } catch (error: any) {
    res.json({ 
      connection: 'FAILED',
      error: error.message 
    })
  }
})

// Importar rotas (agora vai funcionar!)
try {
  const { routes } = require('./src/routes')
  app.use(routes)
  console.log('Rotas carregadas com sucesso!')
} catch (error: any) {
  console.error('Error loading routes:', error)
  // Não usar res aqui, só logar erro
}

// Handler para Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Request received:', req.method, req.url)
  return app(req, res)
}
