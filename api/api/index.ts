import { VercelRequest, VercelResponse } from '@vercel/node'
import app from '../src/server'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res)
}
