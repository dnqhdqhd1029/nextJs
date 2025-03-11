import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import SelectTime from '~/components/common/ui/SelectTime'
import TagList from '~/components/common/ui/TagList'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import TagSearch from '~/components/contents/common/forms/TagSearchForm/TagSearch'
import { transformTimezoneText } from '~/utils/common/date'
import { useMonitoringSearchDetail } from '~/utils/hooks/contents/monitoring/useMonitoringSearchDetail'

const NewsEditPopup = () => {
  const {
    newsApiParams,
    newsIdParams,
    timeZoneData,
    newsLinkLoading,
    newsEditPopup,
    initNewsEditPopupData,
    setAllResetNewsEditPopupTagListAction,
    setResetNewsEditPopupTagListAction,
    setAllResetNewsEditPopupTagStatusChange,
    setonTagListChangeTargetAuthorAction,
    setonTagListChangeTargetMediaAction,
    setNewsEditPopupCalendarAction,
    setNewsEditPopupTitleAction,
    setNewsEditPopupLinkAction,
    setDeleteTagListChangeTargetMediaAction,
    setDeleteTagListChangeTargetAuthorAction,
    setAllDeleteTagListChangeTargetAuthorAction,
    setNewsEditPopupSelectedTimeAction,
    getNewsSearch,
    personalEditAction,
    personalStepValidate,
    afterClipbookAction,
  } = useMonitoringSearchDetail()
  const [isLoading, setIsLoading] = useState(false)
  const value = useRef(0)
  const activityAction = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await personalStepValidate(newsEditPopup)
    if (check && newsIdParams && newsIdParams.newsid) {
      const res = await personalEditAction(newsEditPopup, newsIdParams)
      if (res === 'S') {
        value.current++
      } else {
        setIsLoading(() => false)
      }
    } else {
      setIsLoading(() => false)
    }
  }

  useEffect(() => {
    if (value.current !== 0) {
      const action = setInterval(() => {
        console.log(value.current) // value의 현재 값인 vaule.current를 가져오도록 한다.
        setIsLoading(() => false)
        value.current = 0
        newsIdParams && afterClipbookAction(newsApiParams, newsIdParams)
      }, 1500)
      return () => clearInterval(action)
    }
  }, [value.current])

  return (
    <>
      <Popup
        isOpen={newsEditPopup.isOpen}
        onClose={() => initNewsEditPopupData()}
        hasCloseButton
        title={'개인 추가 뉴스 수정'}
        width={800}
        // height={800}
        className="popup-none-scroll"
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'수정'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={e => activityAction(e)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => initNewsEditPopupData()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">수정할 뉴스 정보를 입력하세요.</p>
        </div>

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
                    onChange={e => setNewsEditPopupLinkAction(e.target.value)}
                    disabled={newsLinkLoading}
                    value={newsEditPopup.link}
                    failed={newsEditPopup.linkErr !== ''}
                    msg={newsEditPopup.linkErr}
                  />
                </div>
                <div className="elem-2">
                  <Button
                    label={'정보 가져오기'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    isLoading={newsLinkLoading}
                    onClick={() => getNewsSearch(newsEditPopup)}
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
              onChange={e => setNewsEditPopupTitleAction(e.target.value, newsEditPopup)}
              failed={newsEditPopup.titleErr !== ''}
              msg={newsEditPopup.titleErr}
              value={newsEditPopup.title}
            />
          </li>
          <li>
            <FormTitle
              title={'날짜'}
              required={true}
            />
            <div className="datepicker-time__section">
              <div className="datepicker-time__group">
                <DatePicker
                  onCalendarChange={(date: Date) => setNewsEditPopupCalendarAction(date, newsEditPopup)}
                  selectedDate={newsEditPopup.selectedDate}
                  errorMsg={newsEditPopup.dateErrorMessage}
                />
                <SelectTime
                  placeholder={'시간 선택'}
                  value={newsEditPopup.selectedTime}
                  changeWidth={'min(50%, 100px)'}
                  onSelect={(hour: number, minute: number) =>
                    setNewsEditPopupSelectedTimeAction(hour, minute, newsEditPopup)
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
              <FormTitle title={'미디어'} />
              <MediaSearch
                isAddTag={true}
                highlightedString={true}
                checkDataLimit={1}
                pageDisabled={newsEditPopup.targetMedia && newsEditPopup.targetMedia.length > 0}
                mediaListValueList={newsEditPopup.targetMedia}
                onChangeTagList={e => setonTagListChangeTargetMediaAction(e, newsEditPopup)}
              />
              <TagList
                tagItems={newsEditPopup.targetMedia}
                onTagItemClose={() => setDeleteTagListChangeTargetMediaAction(newsEditPopup)}
                onAllTagItemClose={() => setDeleteTagListChangeTargetMediaAction(newsEditPopup)}
              />
            </div>
          </li>
        </ul>
        <ul
          className="grid-col2"
          // style={{ paddingBottom: 50 }}
        >
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'태그'} />
              <TagSearch
                isAdd={true}
                isOpen={newsEditPopup.isOpen}
                category={'NEWS'}
                placeholder={'검색 또는 새 태그 만들기'}
                tagValueList={newsEditPopup.tagList}
                onChangeTagList={e => setAllResetNewsEditPopupTagStatusChange(e, newsEditPopup)}
              />
              <TagList
                tagItems={newsEditPopup.tagList}
                onTagItemClose={e => setResetNewsEditPopupTagListAction(e, newsEditPopup)}
                onAllTagItemClose={() => setAllResetNewsEditPopupTagListAction(newsEditPopup)}
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
                pageDisabled={newsEditPopup.targetAuthor && newsEditPopup.targetAuthor.length > 0}
                mediaListValueList={newsEditPopup.targetAuthor}
                onChangeTagList={e => setonTagListChangeTargetAuthorAction(e, newsEditPopup)}
              />
              <TagList
                tagItems={newsEditPopup.targetAuthor}
                onTagItemClose={e => setDeleteTagListChangeTargetAuthorAction(e, newsEditPopup)}
                onAllTagItemClose={() => setAllDeleteTagListChangeTargetAuthorAction(newsEditPopup)}
              />
            </div>
          </li>
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default NewsEditPopup
