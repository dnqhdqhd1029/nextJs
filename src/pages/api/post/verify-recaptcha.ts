import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { ALLOWED_ORIGINS } from '~/constants/common'

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 요청 헤더의 origin 또는 referer 검사
    const origin = req.headers.origin || req.headers.referer

    console.log('>> [api/put/register-verified-user-info] origin : ', origin)

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      // 허용되지 않은 출처일 경우 에러 응답
      return res.status(403).json({ error: 'Access forbidden' })
    }

    const token: string = req.body.token
    const type = req.body.type
    const secretKey = type === 'v3' ? process.env.RECAPTCHA_SECRET_KEY : process.env.RECAPTCHA_SECRET_KEY_V2

    const bodyParams = {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }

    // 구글에 확인
    const result = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        secret: secretKey,
        response: token,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      }
    )

    console.log('>> result', result.data)

    res.status(200).json({ ...result.data })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: 'An unknown error occurred.' })
    }
  }
}

export default handleRequest
