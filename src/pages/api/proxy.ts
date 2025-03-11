import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' })
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const buffer = await response.buffer()

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream')
    res.send(buffer)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
