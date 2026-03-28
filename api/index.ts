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

// Importar rotas (agora vai funcionar!)
try {
  const { routes } = require('./src/routes')
  app.use(routes)
  console.log('Rotas carregadas com sucesso!')
} catch (error) {
  console.error('Error loading routes:', error)
}

// Handler para Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Request received:', req.method, req.url)
  return app(req, res)
}
