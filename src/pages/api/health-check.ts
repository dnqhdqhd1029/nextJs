/**
 * @file health-check.ts
 * @description Health check endpoint for the API.
 */

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ status: 'running', timestamp: new Date().toISOString() })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: 'An unknown error occurred.' })
    }
  }
}

export default handler
