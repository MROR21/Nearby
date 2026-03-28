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

// Test endpoint direto
app.get('/categories', (req, res) => {
  // Dados de teste direto do seed.ts
  const categories = [
    { id: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d", name: "Alimentação" },
    { id: "52e81585-f71a-44cd-8bd0-49771e45da44", name: "Compras" },
    { id: "57d6e5ff-35f6-4d21-a521-84f23d511d25", name: "Hospedagem" },
    { id: "826910d4-187d-4c15-88f4-382b7e056739", name: "Cinema" },
    { id: "abce52cf-b33b-4b3c-8972-eb72c66c83e4", name: "Padaria" }
  ]
  res.json(categories)
})

// Importar rotas (se existirem)
try {
  const { routes } = require('./src/routes')
  app.use(routes)
} catch (error) {
  console.error('Error loading routes:', error)
}

// Handler para Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Request received:', req.method, req.url)
  return app(req, res)
}
