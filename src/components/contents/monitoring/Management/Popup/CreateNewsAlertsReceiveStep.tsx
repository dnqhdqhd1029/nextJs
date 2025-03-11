import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import SelectTime from '~/components/common/ui/SelectTime'
import { defaultDaysList, defaultNewsAlarmTypeList } from '~/components/contents/monitoring/Management/defaultData'
import { receivePageDataType } from '~/stores/modules/contents/newsAlert/newsAlert'
import { ScheduleRow } from '~/types/api/service'

type Props = {
  newsAlertsReceiveData: receivePageDataType
  receivePageDataEmailReceiveDaysOnChange: Function
  receivePageDataEmailReceiveTimeOnChange: Function
  receivePageDataHasExpireAtOnChange: Function
  receivePageDataExpireAtOnChange: Function
  addSchedule: Function
  removeSchedule: Function
}

const CreateNewsAlertsSettingStep = ({
  newsAlertsReceiveData,
  receivePageDataEmailReceiveDaysOnChange,
  receivePageDataEmailReceiveTimeOnChange,
  receivePageDataHasExpireAtOnChange,
  receivePageDataExpireAtOnChange,
  addSchedule,
  removeSchedule,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <ul>
        <li>
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">모니터링은 중복되는 뉴스는 제외하고 신규 뉴스만 메일로 발송됩니다.</p>
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            <FormTitle
              title={'이메일 수신 시간 선택'}
              required={true}
            />
            <ul className="ipt-btn__list--row type-align-cen">
              {defaultDaysList.map((item, idx) => (
                <li key={item.id}>
                  <FormInputBtn
                    type="checkbox"
                    name="emailReceiveDays"
                    id={`email-receive-days-row1-${idx}`}
                    label={item.name}
                    checked={
                      newsAlertsReceiveData?.emailReceiveDate?.emailReceiveDays &&
                      newsAlertsReceiveData?.emailReceiveDate?.emailReceiveDays.includes(item.id)
                    }
                    onChange={e => {
                      receivePageDataEmailReceiveDaysOnChange(e.target.checked, item.id, newsAlertsReceiveData)
                    }}
                  />
                </li>
              ))}
              <li>
                <SelectTime
                  placeholder={'시간 선택'}
                  minuteInterval={10}
                  value={newsAlertsReceiveData?.emailReceiveDate?.emailReceiveTime}
                  onSelect={(hour: number, minute: number) =>
                    receivePageDataEmailReceiveTimeOnChange({ hours: hour, minutes: minute }, newsAlertsReceiveData)
                  }
                />
              </li>
              <li>
                <Button
                  label={'버튼'}
                  cate={'default-ico-only'}
                  size={'m'}
                  color={'outline-form'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.plusLg}
                  onClick={() => {
                    addSchedule(newsAlertsReceiveData.emailReceiveDate, newsAlertsReceiveData)
                  }}
                />
              </li>
            </ul>
            <p className="font-body__small color-secondary">
              수신시간을 매시 정각인 00분으로 설정하면 수요가 몰려 발송이 늦어질 수 있습니다.
            </p>
            <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5', paddingTop: '4px' }}>
              {newsAlertsReceiveData.emailReceiveErr}
              &nbsp;
              {newsAlertsReceiveData.showLink && (
                <Button
                  elem="a"
                  label={'상품 안내 >'}
                  cate={'link-text'}
                  size={'s'}
                  color={'body-link'}
                  // onClick={() => setShowPolicyPopup(true)}
                />
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            {newsAlertsReceiveData.schedules && newsAlertsReceiveData.schedules.length > 0 && (
              <FormTitle
                title={'선택한 수신 시간'}
                required={true}
              />
            )}
            {newsAlertsReceiveData.schedules &&
              newsAlertsReceiveData.schedules.map((schedule: ScheduleRow, rowIdx: number) => {
                return (
                  <>
                    <ul
                      className="ipt-btn__list--row type-align-cen"
                      key={rowIdx}
                    >
                      {defaultDaysList.map((item, idx) => (
                        <li key={item.id}>
                          <FormInputBtn
                            type="checkbox"
                            name="selectedReceiveDays"
                            id={`selected-receive-days-row${rowIdx}-${idx}`}
                            label={item.name}
                            // @ts-ignore
                            checked={schedule[item.id]}
                            disabled={true}
                          />
                        </li>
                      ))}
                      {/* <li>
                <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5', paddingTop: '4px' }}>
                  {newsAlertsSettingData.publishTimeErr}
                </div>
              </li> */}
                      <li>
                        <SelectTime
                          placeholder={'시간 선택'}
                          value={{
                            hours: schedule.hour,
                            minutes: schedule.minute,
                          }}
                          minuteInterval={10}
                          disabled={true}
                        />
                      </li>
                      <li>
                        <Button
                          label={'버튼'}
                          cate={'default-ico-only'}
                          size={'m'}
                          color={'outline-form'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.dashLg}
                          onClick={() => {
                            removeSchedule(rowIdx, newsAlertsReceiveData)
                          }}
                        />
                      </li>
                    </ul>
                    <br />
                  </>
                )
              })}
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            <FormTitle
              title={'기간 선택'}
              required={true}
            />
            <ul className="ipt-btn__list--row">
              {defaultNewsAlarmTypeList.map(item => (
                <li key={'defaultSendEmailTypeList' + item.id.toString()}>
                  <FormBasicRadio
                    name={item.id}
                    id={item.id}
                    label={item.name}
                    onChange={() => receivePageDataHasExpireAtOnChange(item.value, newsAlertsReceiveData)}
                    checked={newsAlertsReceiveData.hasExpireAt === item.value}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>
        {newsAlertsReceiveData.hasExpireAt && (
          <li>
            <div className="mb-contents-pb16__group">
              <FormTitle
                title={'종료일'}
                required={true}
              />
              <DatePicker
                forbiddenBefore={true}
                onCalendarChange={(date: Date) => receivePageDataExpireAtOnChange(date, newsAlertsReceiveData)}
                selectedDate={
                  newsAlertsReceiveData.expireAt !== null ? new Date(newsAlertsReceiveData.expireAt) : undefined
                }
                errorMsg={''}
              />
              <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5', paddingTop: '4px' }}>
                {newsAlertsReceiveData.expireAtErr}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default CreateNewsAlertsSettingStep
