import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import { usePostSendEmailWithFile } from '~/utils/api/email/usePostSendEmailWithFile'

const EmailFile = () => {
  const [file, setFile] = useState<File | null>(null)

  const sendEmail = usePostSendEmailWithFile()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleEmailSend = () => {
    if (file) {
      sendEmail.mutate({
        request: {
          emailList: ['sim.jaeho@newswire.co.kr'],
          title: '테스트 메일입니다.',
          content: '테스트 메일입니다.',
        },
        fileList: [file],
      })
    }
  }

  return (
    <>
      <div style={{ padding: '100px' }}>
        <div className="mb-15">
          <input
            type={'file'}
            onChange={handleFileChange}
          />
        </div>
        <div>
          <Button
            label={'이메일 보내기'}
            onClick={handleEmailSend}
          />
        </div>
      </div>
    </>
  )
}

export default EmailFile
EmailFile.Layout = 'LAYOUT4'
