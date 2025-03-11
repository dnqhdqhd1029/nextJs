import { NextApiRequest, NextApiResponse } from 'next'

import { apiPostInicisAuth } from '~/utils/api/inicis/usePostInicisAuth'
import { apiPostInicisCancel, IInicisCancleParam } from '~/utils/api/inicis/usePostInicisCancel'
import { makeSignature, makeVerification } from '~/utils/common/inicis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const origin = req.headers.origin || req.headers.referer

  // if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
  //   return res.status(403).json({ error: 'Access forbidden' })
  // }

  const { body, method } = await req

  const { resultCode, resultMsg, mid, orderNumber, authToken, idc_name, authUrl, netCancelUrl, charset, merchantData } =
    body
  const format = 'JSON'

  try {
    if (method === 'POST') {
      let timestamp = new Date().getTime()
      let signature = makeSignature(authToken, timestamp)
      let verification = makeVerification(authToken, timestamp)

      if (resultCode === '0000') {
        const param = {
          mid,
          authToken,
          signature,
          verification,
          timestamp,
          charset,
          format,
        }

        const { status, data, statusText } = await apiPostInicisAuth({
          auth_url: authUrl,
          auth_param: param,
        })

        if (status === 200) {
          const { payRequestId, resultUrl, returnUrl, payViewAt, companyName } = JSON.parse(
            (merchantData as string).replaceAll('&quot', '"')
          )

          return res.redirect(
            302,
            `${resultUrl}?${encodeURIComponent(
              `${Object.entries(data)
                .map(arr => `${arr[0]}=${arr[1]}`)
                .join(
                  '&'
                )}&authToken=${authToken}&netCancelUrl=${netCancelUrl}&payRequestId=${payRequestId}&returnUrl=${returnUrl}&payViewAt=${payViewAt}&companyName=${companyName}`
            )}`
          )
        }
      } else {
        return res.send({ resultCode, resultMsg })
      }
    } else {
      return res.status(500).send({ message: 'method error' })
    }
  } catch (error) {
    const timestamp = new Date().getTime()
    const signature = makeSignature(authToken, timestamp)
    const verification = makeVerification(authToken, timestamp)

    const cancelParam: IInicisCancleParam = {
      mid,
      authToken,
      timestamp,
      signature,
      verification,
      charset,
      format,
    }

    const {
      status: cancleStatus,
      data: cancleData,
      statusText: cancleStatusText,
    } = await apiPostInicisCancel({
      cancel_url: netCancelUrl,
      cancel_param: cancelParam,
    })
    return res.status(500).send({ message: error })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
    responseLimit: '8mb',
  },
}
