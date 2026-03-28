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

// Test endpoint direto (hardcoded)
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

// Test endpoint Supabase (se funcionar, está conectado)
app.get('/test-supabase', async (req, res) => {
  try {
    // Tentar conectar ao Supabase
    const response = await fetch('https://db.wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/categories', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cXppbmttZ2xkemh0dHJ5aCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE0NDI2MjQzLCJleHAiOjIwMzAwMDIyNDN9.5JqLK7GmP1Q2zLqTJ3qY2pX7Z8J9T8Y2Z1X7W8J9T8Y',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cXppbmttZ2xkemh0dHJ5aCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE0NDI2MjQzLCJleHAiOjIwMzAwMDIyNDN9.5JqLK7GmP1Q2zLqTJ3qY2pX7Z8J9T8Y2Z1X7W8J9T8Y'
      }
    })
    const data = await response.json()
    res.json({ source: 'supabase', data })
  } catch (error) {
    res.json({ source: 'error', error: error.message })
  }
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
