import { useEffect } from 'react'

const InicisClose = () => {
  const apiUrl = process.env.NEXT_PUBLIC_URL_INICIS_API
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `${apiUrl}/stdjs/INIStdPay_close.js`
    script.async = true
    script.type = 'application/javascript'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return <></>
}

export default InicisClose
InicisClose.Layout = 'PAYMENT'
