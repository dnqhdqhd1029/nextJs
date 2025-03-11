import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { makeSignature, makeVerification } from '~/utils/common/inicis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body, method, query } = await req

    if (method === 'POST') {
      const { mid, authToken, netCancelUrl, charset, format, pay_request_id } = body
      const timestamp = new Date().getTime()
      const signature = makeSignature(authToken as string, timestamp)
      const verification = makeVerification(authToken as string, timestamp)

      const cancelParam = {
        mid,
        authToken,
        timestamp,
        signature,
        verification,
        charset,
        format,
      }

      const { status, data, statusText } = await axios.post(netCancelUrl as string, cancelParam, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      res.send(data)
    } else {
      res.status(500).send({ message: 'method error' })
    }
  } catch (error) {
    res.status(500).send({ message: error })
  }
}
