import { ChangeEvent, Fragment, MouseEvent, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import SelectTime from '~/components/common/ui/SelectTime'
import TagList from '~/components/common/ui/TagList'
import JournalListSearchForm from '~/components/contents/common/forms/JournalListSearchForm/JournalListSearchForm'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import MediaSearchForm from '~/components/contents/common/forms/MediaSearchForm/MediaSearchForm'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import TagSearch from '~/components/contents/common/forms/TagSearchForm/TagSearch'
import { transformTimezoneText } from '~/utils/common/date'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const AddStep = () => {
  const {
    addStep,
    timeZoneData,
    newsListLoading,
    personalParams,
    setAllResetPersonalParamsTagListAction,
    setResetPersonalParamsTagListAction,
    setAllResetPersonalParamsTagStatusChange,
    setResetPersonalParamsClipBookAction,
    setAllResetPersonalParamsClipBookAction,
    setonTagListChangeTargetAuthorAction,
    setonTagListChangeTargetMediaAction,
    setPersonalParamsCalendarAction,
    setPersonalParamsTitleAction,
    setPersonalParamsLinkAction,
    setDeleteTagListChangeTargetMediaAction,
    setDeleteTagListChangeTargetAuthorAction,
    setAllDeleteTagListChangeTargetAuthorAction,
    setPersonalParamsSelectedTimeAction,
    setClipbookPopupAction,
    onChangeStep,
    getNewsSearch,
    personalAddAction,
    personalStepValidate,
  } = useRegisterNews()
  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await personalStepValidate(personalParams)
    if (check) {
      await personalAddAction(personalParams)
    }
    setIsLoading(() => false)
  }

  return (
    <Fragment>
      {addStep === 'add' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <p className="font-body__regular">추가할 뉴스 정보를 입력하세요.</p>
            </li>
            <li>
              <ul>
                <li>
                  <div className="form-2vs8__section">
                    <FormTitle
                      title="웹페이지 URL"
                      required={true}
                    />
                    <div className="form-2vs8__group">
                      <div className="elem-8">
                        <FormInputText
                          placeholder={'https://'}
                          onChange={e => setPersonalParamsLinkAction(e.target.value)}
                          disabled={newsListLoading}
                          value={personalParams.link}
                          failed={personalParams.linkErr !== ''}
                          msg={personalParams.linkErr}
                        />
                      </div>
                      <div className="elem-2">
                        <Button
                          label={'정보 가져오기'}
                          cate={'default'}
                          size={'m'}
                          color={'tertiary'}
                          isLoading={newsListLoading}
                          onClick={() => getNewsSearch(personalParams)}
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <FormTitle
                    title="제목"
                    required={true}
                  />
                  <FormInputText
                    onChange={e => setPersonalParamsTitleAction(e.target.value, personalParams)}
                    failed={personalParams.titleErr !== ''}
                    msg={personalParams.titleErr}
                    value={personalParams.title}
                  />
                </li>
              </ul>
              <ul className="grid-col2">
                <li>
                  <FormTitle
                    title={'날짜'}
                    required={true}
                  />
                  <div className="datepicker-time__section">
                    <div className="datepicker-time__group">
                      <DatePicker
                        onCalendarChange={(date: Date) => setPersonalParamsCalendarAction(date, personalParams)}
                        selectedDate={personalParams.selectedDate}
                        errorMsg={personalParams.dateErrorMessage}
                      />
                      <SelectTime
                        placeholder={'시간 선택'}
                        value={personalParams.selectedTime}
                        changeWidth={'min(50%, 100px)'}
                        onSelect={(hour: number, minute: number) =>
                          setPersonalParamsSelectedTimeAction(hour, minute, personalParams)
                        }
                      />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150 }}>
                        {transformTimezoneText(timeZoneData.name)}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체'} />
                    <MediaSearch
                      isAddTag={true}
                      highlightedString={true}
                      checkDataLimit={1}
                      pageDisabled={personalParams.targetMedia && personalParams.targetMedia.length > 0}
                      mediaListValueList={personalParams.targetMedia}
                      onChangeTagList={e => setonTagListChangeTargetMediaAction(e, personalParams)}
                    />
                    <TagList
                      tagItems={personalParams.targetMedia}
                      onTagItemClose={() => setDeleteTagListChangeTargetMediaAction(personalParams)}
                      onAllTagItemClose={() => setDeleteTagListChangeTargetMediaAction(personalParams)}
                    />
                  </div>
                </li>
              </ul>
              <ul className="grid-col2">
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'태그'} />
                    <TagSearch
                      isAdd={true}
                      isOpen={addStep === 'add'}
                      category={'NEWS'}
                      placeholder={'검색 또는 새 태그 만들기'}
                      tagValueList={personalParams.tagList}
                      onChangeTagList={e => setAllResetPersonalParamsTagStatusChange(e, personalParams)}
                    />
                    <TagList
                      tagItems={personalParams.tagList}
                      onTagItemClose={e => setResetPersonalParamsTagListAction(e, personalParams)}
                      onAllTagItemClose={() => setAllResetPersonalParamsTagListAction(personalParams)}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'저자'} />
                    <PressSearch
                      isAddTag={true}
                      highlightedString={true}
                      checkDataLimit={1}
                      pageDisabled={personalParams.targetAuthor && personalParams.targetAuthor.length > 0}
                      mediaListValueList={personalParams.targetAuthor}
                      onChangeTagList={e => setonTagListChangeTargetAuthorAction(e, personalParams)}
                    />
                    <TagList
                      tagItems={personalParams.targetAuthor}
                      onTagItemClose={e => setDeleteTagListChangeTargetAuthorAction(e, personalParams)}
                      onAllTagItemClose={() => setAllDeleteTagListChangeTargetAuthorAction(personalParams)}
                    />
                  </div>
                </li>
              </ul>
              <li>
                <div className="select-form__section select-form-btn">
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'클립북'} />
                    <div className="select-form__group">
                      <Button
                        label={'클립북 선택'}
                        cate={'default'}
                        size={'m'}
                        color={'tertiary'}
                        onClick={() => setClipbookPopupAction(true, personalParams.clipbookList)}
                      />
                    </div>
                    <TagList
                      tagItems={personalParams.clipbookList}
                      onTagItemClose={e => setResetPersonalParamsClipBookAction(e, personalParams)}
                      onAllTagItemClose={() => setAllResetPersonalParamsClipBookAction(personalParams)}
                    />
                  </div>
                </div>
              </li>
            </li>
          </ul>
          <div className="mb-contents-footer__section">
            <div className="buttons__group">
              <Button
                label={'저장'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                isLoading={isLoading}
                disabled={isLoading}
                onClick={e => actionAndNext(e)}
              />
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                disabled={isLoading}
                onClick={() => onChangeStep('information')}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default AddStep
