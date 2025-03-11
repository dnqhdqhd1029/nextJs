import { useState } from 'react'
import axios from 'axios'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { defaultPublishLanguageList } from '~/components/contents/generatePressRelease/defaultData'
import { requestDataProps } from '~/stores/modules/contents/generatePressRelease/generatePressRelease'
import { SelectListOptionItem } from '~/types/common'
import { useGeneratePressRelease } from '~/utils/hooks/contents/generatePressRelease/useGeneratePressRelease'

const GeneratePressReleasePage = () => {
  const {
    requestData,
    responseData,
    saveActionValidate,
    requestDataProductOnChange,
    requestDataMessageOnChange,
    requestDataToneOnChange,
    requestDataAudienceOnChange,
    requestDataLanguageOnChange,
  } = useGeneratePressRelease()

  const [streamData, setStreamData] = useState('')
  const [showStreamData, setShowStreamData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generatePressRelease = async (params: requestDataProps) => {
    const check = await saveActionValidate(params)
    if (check) {
      const params = {
        product: requestData.product,
        message: requestData.message,
        tone: requestData.tone,
        audience: requestData.audience,
        language: requestData.language.id,
      }
      const response = await fetch(`https://aiapi.d.mediabee.kr/v1/svc/callgpt-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(params),
      })
      setIsLoading(true)
      setStreamData('')
      setShowStreamData(true)
      const reader = response?.body?.getReader()
      const decoder = new TextDecoder('utf-8')

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            setIsLoading(false)
            break
          }
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n\n')
          lines.forEach(line => {
            console.log(line)
            const content = line.replace(/data:/g, '')
            setStreamData(prev => prev + content)
          })
        }
      }
    }
  }

  return (
    <div className="mb-contents-layout__contents">
      <div
        className="distribute-steps__section"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div
          className="distribute-steps__group"
          style={{ height: 'fit-content', width: '600px', minWidth: '600px' }}
        >
          <ul>
            <li>
              <h4 className="common-title__title">보도자료 초안 생성</h4>
            </li>
            <br />
            <li>
              <FormTitle title="간단한 내용 입력으로 전문적인 보도자료를 만들어보세요." />
            </li>
            <br />
            <li>
              <FormTitle
                title="제품/서비스명"
                required={true}
              />
              <FormInputText
                required={true}
                onChange={e => requestDataProductOnChange(e.target.value, requestData)}
                value={requestData.product}
                failed={requestData.productErr !== ''}
                msg={requestData.productErr}
              />
            </li>
            <li>
              <div className="textarea__area">
                <FormTitle
                  title="내용"
                  required={true}
                />
                <div
                  className={cn('textarea__group', {
                    'is-succeeded': requestData.messageErr === '',
                    'is-failed': requestData.messageErr !== '',
                  })}
                >
                  <textarea
                    placeholder="발표 내용, 회사 정보, 전달할 메시지, 관계자 코멘트 등"
                    rows={6}
                    onChange={e => requestDataMessageOnChange(e.target.value, requestData)}
                    value={requestData.message}
                    style={{
                      resize: 'none',
                    }}
                  ></textarea>
                </div>
                {requestData.messageErr !== '' && (
                  <FormMsg
                    msg={requestData.messageErr}
                    type={'error'}
                  />
                )}
              </div>
            </li>
            <li>
              <FormTitle title="어조" />
              <FormInputText
                placeholder={'공식적, 친근한, 강조하는, 설득적,  긍정적, 일상적, 비판적...'}
                onChange={e => requestDataToneOnChange(e.target.value, requestData)}
                value={requestData.tone}
              />
            </li>
            <li>
              <FormTitle title="독자" />
              <FormInputText
                placeholder={'소비자, 일반 대중, 관련 업계 종사자, 투자자, IT 전문 기자, 기술 블로거...'}
                onChange={e => requestDataAudienceOnChange(e.target.value, requestData)}
                value={requestData.audience}
              />
            </li>
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title="언어" />
                <Select
                  listDirection={'down'}
                  options={defaultPublishLanguageList}
                  onChange={(option: SelectListOptionItem) => requestDataLanguageOnChange(option, requestData)}
                  value={requestData.language}
                />
              </div>
            </li>
            <br />
            <li style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                label={'생성하기'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                disabled={isLoading}
                isLoading={isLoading}
                onClick={() => generatePressRelease(requestData)}
              />
            </li>
          </ul>
        </div>
        {showStreamData && (
          <div
            className="distribute-steps__group"
            style={{ marginTop: 0, marginLeft: '20px', minWidth: '600px' }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{streamData}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneratePressReleasePage
