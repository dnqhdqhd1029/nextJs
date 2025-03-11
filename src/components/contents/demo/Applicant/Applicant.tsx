import FormInputText from '~/components/common/ui/FormInputText'
import { useDemo } from '~/utils/hooks/contents/demo/useDemo'

const Applicant = () => {
  const {
    applicantInfo,
    setDepartmentAction,
    setPositionAction,
    setPhoneCallNmAction,
    setApplicantNameAction,
    setApplicantTelePhoneAction,
    setApplicantEmailAction,
  } = useDemo()

  return (
    <li>
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular fw700">신청인</p>
      </div>
      <ul className="grid-col2">
        <li>
          <FormInputText
            title={'이름'}
            required={true}
            onChange={e => setApplicantNameAction(e.target.value, applicantInfo)}
            failed={applicantInfo.nameErr !== ''}
            msg={applicantInfo.nameErr}
            value={applicantInfo.name}
          />
        </li>
        <li>
          <FormInputText
            title={'이메일'}
            required={true}
            onChange={e => setApplicantEmailAction(e.target.value, applicantInfo)}
            failed={applicantInfo.emailErr !== ''}
            msg={applicantInfo.emailErr}
            value={applicantInfo.email}
          />
        </li>
        <li>
          <FormInputText
            title={'전화'}
            required={true}
            extraInputType={'normalPhone'}
            onChangeExtra={e => setPhoneCallNmAction(e, applicantInfo)}
            failed={applicantInfo.phoneNmErr !== ''}
            msg={applicantInfo.phoneNmErr}
            value={applicantInfo.phoneNm}
          />
        </li>
        <li>
          <FormInputText
            title={'휴대전화'}
            extraInputType={'phone'}
            onChangeExtra={e => setApplicantTelePhoneAction(e, applicantInfo)}
            failed={applicantInfo.telephoneErr !== ''}
            msg={applicantInfo.telephoneErr}
            value={applicantInfo.telephone}
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
  )
}

export default Applicant
