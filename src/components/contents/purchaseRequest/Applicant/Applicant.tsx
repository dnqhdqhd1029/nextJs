import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Skeleton from '~/components/common/ui/Skeleton'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const Applicant = () => {
  const {
    isCompanyLoading,
    applicantInfo,
    setApplicantInfoPhoneAction,
    setApplicantInfoTelePhoneAction,
    setApplicantInfoPositionAction,
    setApplicantInfoDepartmentAction,
  } = usePurchaseRequest()

  return (
    <li>
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular fw700">신청인</p>
      </div>
      <ul className="grid-col2">
        <li>
          {isCompanyLoading ? (
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
          {isCompanyLoading ? (
            <>
              <FormTitle title="이메일" />
              <Skeleton
                width={'960px'}
                height={'35px'}
              />
            </>
          ) : (
            <FormInputText
              title={'이메일'}
              disabled={true}
              value={applicantInfo.email}
            />
          )}
        </li>
        <li>
          <FormInputText
            title={'전화'}
            required={true}
            extraInputType={'normalPhone'}
            onChangeExtra={e => setApplicantInfoPhoneAction(e, applicantInfo)}
            failed={applicantInfo.phoneErr !== ''}
            msg={applicantInfo.phoneErr}
            value={applicantInfo.phone}
          />
        </li>
        <li>
          <FormInputText
            title={'휴대 전화'}
            extraInputType={'phone'}
            onChangeExtra={e => setApplicantInfoTelePhoneAction(e, applicantInfo)}
            failed={applicantInfo.telePhoneErr !== ''}
            msg={applicantInfo.telePhoneErr}
            value={applicantInfo.telephone}
          />
        </li>
        <li>
          <FormInputText
            title={'부서'}
            required={true}
            onChange={e => setApplicantInfoDepartmentAction(e.target.value, applicantInfo)}
            failed={applicantInfo.departmentErr !== ''}
            msg={applicantInfo.departmentErr}
            value={applicantInfo.department}
          />
        </li>
        <li>
          <FormInputText
            title={'직책'}
            required={true}
            onChange={e => setApplicantInfoPositionAction(e.target.value, applicantInfo)}
            failed={applicantInfo.positionErr !== ''}
            msg={applicantInfo.positionErr}
            value={applicantInfo.position}
          />
        </li>
      </ul>
    </li>
  )
}

export default Applicant
