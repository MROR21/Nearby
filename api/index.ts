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

// Teste básico da URL do Supabase
app.get('/test-url', async (req, res) => {
  try {
    // Testar se a URL responde
    const response = await fetch('https://db.wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    const result = await response.text()
    res.json({ 
      source: 'url-test', 
      status: response.status,
      ok: response.ok,
      result: result.substring(0, 200) // Primeiros 200 chars
    })
  } catch (error: any) {
    res.json({ source: 'url-error', error: error.message || 'Unknown error' })
  }
})

// Teste URL base do projeto
app.get('/test-project', async (req, res) => {
  try {
    // Testar URL base do projeto
    const response = await fetch('https://wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/categories', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k'
      }
    })
    const data = await response.json()
    res.json({ source: 'project-url', data })
  } catch (error: any) {
    res.json({ source: 'project-error', error: error.message || 'Unknown error' })
  }
})

// Test endpoint com chave correta
app.get('/test-correct-key', async (req, res) => {
  try {
    // COLOQUE A CHAVE CORRETA AQUI:
    const correctKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k"
    
    const response = await fetch('https://db.wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/categories', {
      headers: {
        'apikey': correctKey,
        'Authorization': `Bearer ${correctKey}`
      }
    })
    const data = await response.json()
    res.json({ source: 'correct-key', data })
  } catch (error: any) {
    res.json({ source: 'key-error', error: error.message || 'Unknown error' })
  }
})

// Test endpoint Supabase (se funcionar, está conectado)
app.get('/test-supabase', async (req, res) => {
  try {
    // Tentar conectar com chave pública (sem auth)
    const response = await fetch('https://db.wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/categories', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k'
      }
    })
    const data = await response.json()
    res.json({ source: 'supabase', data })
  } catch (error: any) {
    res.json({ source: 'error', error: error.message || 'Unknown error' })
  }
})

// Teste sem autenticação (chave pública)
app.get('/test-public', async (req, res) => {
  try {
    // Tentar com apenas apikey (sem Bearer)
    const response = await fetch('https://db.wqxqinkmgldmzhtwtryh.supabase.co/rest/v1/categories', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeHFpbmttZ2xkbXpodHd0cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjI0MjAsImV4cCI6MjA5MDI5ODQyMH0.b1x1iejz4gCrRTXN7dYHGXX0FWqsPbXrCfP6KY2Ws1k'
      }
    })
    const data = await response.json()
    res.json({ source: 'public', data })
  } catch (error: any) {
    res.json({ source: 'error', error: error.message || 'Unknown error' })
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
