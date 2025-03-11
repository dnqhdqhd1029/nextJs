import { NextApiRequest, NextApiResponse } from 'next'

import { ALLOWED_ORIGINS } from '~/constants/common'
import type { ResetPasswordDto } from '~/types/api/service'
import { apiPutUserResetPassword } from '~/utils/api/user/usePutUserResetPassword'

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 요청 헤더의 origin 또는 referer 검사
    const origin = req.headers.origin || req.headers.referer

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      // 허용되지 않은 출처일 경우 에러 응답
      return res.status(403).json({ error: 'Access forbidden' })
    }

    const passwordInfo: ResetPasswordDto = req.body.passwordInfo
    const locale: string = req.body.locale
    const id = Number(req.query.id)

    const result = await apiPutUserResetPassword({
      id,
      passwordInfo: { ...passwordInfo },
      locale,
    })
    console.log('>> reset password : ', result)
    res.status(200).json(result)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: 'An unknown error occurred.' })
    }
  }
}

export default handleRequest
