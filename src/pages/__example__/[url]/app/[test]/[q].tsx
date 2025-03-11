import { useEffect } from 'react'
import { useRouter } from 'next/router'

const CkEditorExample = () => {
  const router = useRouter()

  useEffect(() => {
    console.log('>> router', router)
  }, [router])
  return <div>테스트</div>
}

export default CkEditorExample
CkEditorExample.Layout = 'LAYOUT4'
