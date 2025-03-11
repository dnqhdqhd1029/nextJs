import { ChangeEvent, Fragment, MouseEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import JournalListGroupSearchForm from '~/components/contents/common/forms/JournalListGroupSearchForm/JournalListGroupSearchForm'
import JournalListSearchForm from '~/components/contents/common/forms/JournalListSearchForm/JournalListSearchForm'
import MbTagSearch from '~/components/contents/common/forms/MbTagSearch'
import MediaBookSearch from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import MediaListGroupSearchForm from '~/components/contents/common/forms/MediaListGroupSearchForm/MediaListGroupSearchForm'
import MediaSearchForm from '~/components/contents/common/forms/MediaSearchForm/MediaSearchForm'
import PressBookSearch from '~/components/contents/common/forms/PressBookSearchForm/PressBookSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import MbTagSearchCreateLayer from '~/components/contents/common/layer/MbTagSearchCreateLayer/MbTagSearchCreateLayer'
import {
  defaultTemplateTabs,
  extendedShareScopeList,
  settingReceiverList,
} from '~/components/contents/distribution/Release/Press/defaultData'
import type { TagDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

interface Props {
  offRouteChangeBlocking: any
}
const SettingStep = (props: Props) => {
  const router = useRouter()
  const {
    tab,
    mailingId,
    receiversData,
    settingPageData,
    userInfo,
    licenseInfo,
    templatePageData,
    contentPageData,
    confirmPageData,
    editorData,
    settingPageDataTitleOnChange,
    settingPageDataResetTagListOnChange,
    settingPageDataTagCloseOnChange,
    settingPageDataTagStatusOnChange,
    settingPageDataShareOnChange,
    settingPageDataIsSendToMeOnChange,
    settingPageDataTargetEmailListAction,
    settingPageDataAllResetTagPressListAction,
    settingPageDataResetTagPressListAction,
    settingPageDataTagPressListAction,
    settingPageDataReceiverGroupOnChange,
    settingPageDataTagCreateSuccessOnChange,
    fromSettingToTemplate,
    settingStepValidate,
    editStepMailingIdAndOut,
    createMailingIdAndOut,
    unLockAction,
    fromDataToContents,
  } = usePressRelese()
  const [isLoadingId, setIsLoadingId] = useState<string>('')

  const actionAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoadingId('out')
    if (mailingId > 0) {
      const check = await settingStepValidate(settingPageData)
      if (check) {
        const releaseData = await fromDataToContents(mailingId, editorData)
        const res = await editStepMailingIdAndOut(
          settingPageData,
          releaseData ? releaseData.template : templatePageData,
          releaseData ? releaseData.content : contentPageData,
          releaseData ? releaseData.confirm : confirmPageData,
          releaseData ? releaseData.content.content : editorData,
          mailingId,
          tab.id
        )
        if (res === 'S') {
          const unLock = await unLockAction(mailingId)
          if (unLock === 'S') {
            openToast('보도자료를 초안으로 임시저장했습니다.', 'success')
            props.offRouteChangeBlocking(() => router.push('/activity/search'))
          }
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    } else {
      const check = await settingStepValidate(settingPageData)
      if (check) {
        await createMailingIdAndOut(settingPageData)
        openToast('보도자료를 초안으로 임시저장했습니다.', 'success')
        props.offRouteChangeBlocking(() => router.push('/activity/search', undefined))
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    }
    setIsLoadingId('')
  }

  const actionAndNext = async () => {
    setIsLoadingId('next')
    if (mailingId > 0) {
      const check = await settingStepValidate(settingPageData)
      if (check) {
        const releaseData = await fromDataToContents(mailingId, editorData)
        const res = await editStepMailingIdAndOut(
          settingPageData,
          releaseData ? releaseData.template : templatePageData,
          releaseData ? releaseData.content : contentPageData,
          releaseData ? releaseData.confirm : confirmPageData,
          releaseData ? releaseData.content.content : editorData,
          mailingId,
          tab.id
        )
        if (res === 'S') await fromSettingToTemplate(mailingId)
      }
    } else {
      const check = await settingStepValidate(settingPageData)
      if (check) {
        const res = await createMailingIdAndOut(settingPageData)
        if (res !== 0) {
          await fromSettingToTemplate(res)
        }
      }
    }
    setIsLoadingId('')
  }

  const totalReceiversText = useMemo(() => {
    if (!receiversData) return ''
    const { totalCount, dupCount, blockReceiveCount, blockSendCount, errorSendCount } = receiversData
    return `총 <strong>${totalCount}</strong>명 (중복 ${dupCount}명, 수신거부 ${blockReceiveCount}명, 발송차단 ${blockSendCount}명, 메일장애 일시 발송차단 ${errorSendCount} 제외)`
  }, [receiversData])

  return (
    <>
      {tab.id === 'setting' && (
        <Fragment>
          <div className="mb-contents-layout__contents">
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <ul>
                  <li>
                    <FormTitle
                      title="보도자료명"
                      required={true}
                    />
                    <FormTitle title="보도자료의 제목을 입력하세요." />
                    <FormInputText
                      required={true}
                      onChange={e => settingPageDataTitleOnChange(e.target.value, settingPageData)}
                      failed={settingPageData.titleErr !== ''}
                      msg={settingPageData.titleErr}
                      value={settingPageData.titleForManage}
                    />
                  </li>
                  <li>
                    <ul className="grid-col2">
                      <li>
                        <FormInputText
                          title={'보내는 사람'}
                          value={userInfo.name}
                          readonly={true}
                        />
                      </li>
                      <li>
                        <FormInputText
                          title={'회신 메일'}
                          value={userInfo.email}
                          readonly={true}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="ipt-btn__section sp-pb-2">
                      <FormTitle
                        title={'받는 사람'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        {settingReceiverList.map((e, index) => (
                          <li key={index + e.id}>
                            <FormBasicRadio
                              name={e.id}
                              id={e.id}
                              label={e.title}
                              onChange={() => settingPageDataReceiverGroupOnChange(e.id, settingPageData)}
                              checked={settingPageData.receiverGroup === e.id}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="select-form__section select-form-input">
                      {settingPageData.receiverGroup === 'press' && (
                        <PressSearch
                          highlightedString={true}
                          mediaListValueList={settingPageData.tagPressList}
                          onChangeTagList={e => settingPageDataTagPressListAction(e, settingPageData)}
                        />
                      )}
                      {settingPageData.receiverGroup === 'media' && (
                        <MediaSearch
                          highlightedString={true}
                          mediaListValueList={settingPageData.tagPressList}
                          onChangeTagList={e => settingPageDataTagPressListAction(e, settingPageData)}
                        />
                      )}
                      {settingPageData.receiverGroup === 'pressList' && (
                        <PressBookSearch
                          isJustCount={true}
                          isDetail={true}
                          mediaListValueList={settingPageData.tagPressList}
                          onChangeTagList={e => settingPageDataTagPressListAction(e, settingPageData)}
                        />
                      )}
                      {settingPageData.receiverGroup === 'mediaList' && (
                        <MediaBookSearch
                          isJustCount={false}
                          isDetail={true}
                          mediaListValueList={settingPageData.tagPressList}
                          onChangeTagList={e => settingPageDataTagPressListAction(e, settingPageData)}
                        />
                      )}
                      <TagList
                        tagItems={settingPageData.tagPressList}
                        onTagItemClose={e => settingPageDataResetTagPressListAction(e, settingPageData)}
                        onAllTagItemClose={() => settingPageDataAllResetTagPressListAction(settingPageData)}
                      />
                      {settingPageData.recipientErr !== '' && (
                        <FormMsg
                          msg={settingPageData.recipientErr}
                          type={'error'}
                        />
                      )}
                    </div>
                  </li>
                  <li>
                    <ul className="grid-col2">
                      <li>
                        <MbTagSearch
                          title={'메일 추가'}
                          onTagListChange={(tagItems: MbTagSearchTagItem[]) =>
                            settingPageDataTargetEmailListAction(settingPageData, tagItems)
                          }
                          storedTagItems={settingPageData.targetEmail}
                          key={'targetEmail'}
                          functionType={'inputTagAdd'}
                          validateType={'email'}
                          maxTagLimitTitle={'받는 메일'}
                          maxTagLimit={20}
                          willStoredTagItemsUpdate={true}
                        />
                      </li>
                      <li>
                        <FormTitle title="나에게도 보내기" />
                        <FormInputToggle
                          id="news-release-send-to-me"
                          name="news-release-send-to-me"
                          checked={settingPageData.isSendToMe}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            settingPageDataIsSendToMeOnChange(e.target.checked, settingPageData)
                          }
                        />
                      </li>
                    </ul>
                  </li>
                  {!!receiversData?.totalCount && (
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <div className="ipt-text__area">
                            <FormTitle title="총 수신자" />
                            <p className="ipt-text-readonly">
                              <span
                                className="fw400"
                                dangerouslySetInnerHTML={{
                                  __html: totalReceiversText
                                    ? totalReceiversText
                                    : `총 <strong>0</strong>명 (중복 0명, 수신거부 0명, 발송차단 0명, 메일장애 일시 발송차단 0명 제외)`,
                                }}
                              />
                            </p>
                          </div>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li>
                    <ul className="grid-col2">
                      {licenseInfo?.flagShare &&
                        ((!!mailingId && settingPageData.owner.userId === userInfo.userId) || !!!mailingId) && (
                          <li>
                            <div className="select-form__section select-form-btn">
                              <FormTitle title={'공유 설정'} />
                              <Select
                                options={extendedShareScopeList}
                                onChange={(option: SelectListOptionItem) =>
                                  settingPageDataShareOnChange(option, settingPageData)
                                }
                                value={settingPageData.scrop}
                                listDirection="up"
                              />
                            </div>
                          </li>
                        )}
                      <li>
                        <div className="select-form__section select-form-input">
                          <div className="select-form__group">
                            <FormTitle title={'태그'} />
                            <MbTagSearchCreateLayer
                              isOpen={true}
                              category={'ACTION'}
                              mode={'FLAT'}
                              position={'up'}
                              parentTagItems={settingPageData.tagList}
                              onCreateSuccess={(item: TagDto) =>
                                settingPageDataTagCreateSuccessOnChange(item, settingPageData)
                              }
                              onTagStatusChange={(e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) =>
                                settingPageDataTagStatusOnChange(e, item, settingPageData)
                              }
                            />
                            <TagList
                              tagItems={settingPageData.tagList}
                              onTagItemClose={e => settingPageDataTagCloseOnChange(e, settingPageData)}
                              onAllTagItemClose={() => settingPageDataResetTagListOnChange(settingPageData)}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-contents-layout__footer">
            <div className="distribute-steps__footer">
              <div className="footer-button__group">
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'저장하고 나가기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      isLoading={isLoadingId === 'out'}
                      disabled={!settingPageData?.isEdit || isLoadingId !== ''}
                      onClick={e => actionAndOut(e)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      isLoading={isLoadingId === 'next'}
                      disabled={isLoadingId !== ''}
                      icoRightData={icoSvgData.chevronThickRight}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default SettingStep
