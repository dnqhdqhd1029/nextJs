import { FormEvent, useState } from 'react'

import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Skeleton from '~/components/common/ui/Skeleton'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const Applicant = () => {
  const {
    isLoading,
    requestInfo,
    paymentTypeKey,
    applicantInfo,
    textareaHeight,
    resizeTextarea,
    onKeyEnter,
    setRequestInfoActionAction,
    setPhoneCallNmAction,
    setNormalPhoneNmAction,
    setDepartmentAction,
    setPositionAction,
  } = usePayments()

  return (
    <>
      <li>
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular fw700">신청인</p>
        </div>
        <ul className="grid-col2">
          <li>
            {isLoading ? (
              <>
                <FormTitle title="회사 이메일" />
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              </>
            ) : (
              <FormInputText
                title={'회사 이메일'}
                disabled={true}
                value={applicantInfo.email}
              />
            )}
          </li>
          <li>
            {isLoading ? (
              <>
                <FormTitle title="회사" />
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              </>
            ) : (
              <FormInputText
                title={'회사'}
                disabled={true}
                value={applicantInfo.companyNm}
              />
            )}
          </li>
          <li>
            {isLoading ? (
              <>
                <FormTitle title="이름" />
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              </>
            ) : (
              <FormInputText
                title={'이름'}
                disabled={true}
                value={applicantInfo.name}
              />
            )}
          </li>
          <li>
            {isLoading ? (
              <>
                <FormTitle title="전화" />
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              </>
            ) : (
              <FormInputText
                title={'전화'}
                disabled={paymentTypeKey === 'non_user'}
                value={applicantInfo.phone}
                extraInputType={'normalPhone'}
                onChangeExtra={e => paymentTypeKey !== 'non_user' && setNormalPhoneNmAction(e, applicantInfo)}
              />
            )}
          </li>
          <li>
            <FormInputText
              title={'휴대전화'}
              required={true}
              extraInputType={'phone'}
              onChangeExtra={e => setPhoneCallNmAction(e, applicantInfo)}
              failed={applicantInfo.phoneCallNmErr !== ''}
              msg={applicantInfo.phoneCallNmErr}
              value={applicantInfo.phoneCallNm}
            />
          </li>
          <li>
            <FormInputText
              title={'부서'}
              required={true}
              onChange={e => setDepartmentAction(e.target.value, applicantInfo)}
              failed={applicantInfo.departmentErr !== ''}
              msg={applicantInfo.departmentErr}
              value={applicantInfo.department}
            />
          </li>
          <li>
            <FormInputText
              title={'직책'}
              required={true}
              onChange={e => setPositionAction(e.target.value, applicantInfo)}
              failed={applicantInfo.positionErr !== ''}
              msg={applicantInfo.positionErr}
              value={applicantInfo.position}
            />
          </li>
        </ul>
      </li>
      <li>
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular fw700">요청사항</p>
        </div>
        <div>
          <div className="textarea__area">
            <div className="textarea__group">
              <textarea
                style={{
                  all: 'unset',
                  display: 'block',
                  width: '100%',
                  // @ts-ignore
                  height: `${({ row, theme }) => +theme.listSize * row + 4}px`,
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                  resize: 'none',
                  fontSize: '1.4rem',
                  color: '#202121',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: 1.5,
                  textDecoration: 'none',
                  padding: '6px 12px',
                }}
                autoComplete="off"
                onInput={e => resizeTextarea(e)}
                onKeyDown={e => onKeyEnter(e)}
                rows={textareaHeight.row}
                value={requestInfo}
                onChange={e => setRequestInfoActionAction(e.target.value)}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default Applicant
