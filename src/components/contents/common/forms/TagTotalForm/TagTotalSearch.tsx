import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import type { TabItem } from '~/components/common/ui/Tabs'
import TagList from '~/components/common/ui/TagList'
import {
  DefaulttagPopupNaviLinks,
  tagPopupNaviLinks,
} from '~/components/contents/common/forms/TagTotalForm/defaultData'
import TagSelectedBox from '~/components/contents/common/forms/TagTotalForm/TagSelectedBox'
import TagTotalList from '~/components/contents/common/forms/TagTotalForm/TagTotalList'
import { PageTagDto } from '~/types/api/service'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetTagList } from '~/utils/api/tag/useGetTagList'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  isOpen: boolean
  category: 'NEWS' | 'ACTION'
  targetCount: number
  originTagList: MbTagSearchTagItem[]
  onChangeTagList: (e: MbTagSearchTagItem[], type: string) => void
  closeTagTotalSearchPopup: () => void
}

const TagTotalSearch = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(DefaulttagPopupNaviLinks)
  const [tagValueList, setTagValueList] = useState<MbTagSearchTagItem[]>([])

  const deleteTag = (e: MbTagSearchTagItem) => {
    const res = tagValueList.filter(item => item.id !== e.id)
    setTagValueList(() => res)
  }

  const changeTypeTag = async (e: TabItem) => {
    setIsLoading(() => true)
    setSelectedKey(() => e)
    setTagValueList(() => [])
    setIsLoading(() => false)
  }

  const actionTag = async (e: string) => {
    setIsLoading(() => true)
    if (e === 'close') {
      props.closeTagTotalSearchPopup()
      setSelectedKey(() => DefaulttagPopupNaviLinks)
      setTagValueList(() => [])
      setTagOpen(() => props.isOpen)
      setIsLoading(() => false)
    } else {
      props.onChangeTagList(tagValueList, selectedKey.id)
    }
  }

  useEffect(() => {
    setIsLoading(() => false)
    setSelectedKey(() => tagPopupNaviLinks[0])
    setTagValueList(() => [])
    setTagOpen(() => props.isOpen)
  }, [props.isOpen])
  return (
    <>
      <Popup
        width={500}
        height={300}
        isOpen={tagOpen}
        hasCloseButtonLoading={isLoading}
        onClose={() => actionTag('close')}
        className="popup-none-scroll"
        hasCloseButton
        title={`${props.targetCount}개 ${props.category === 'NEWS' ? '뉴스의' : '활동의'} 태그 입력`}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => actionTag('edit')}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => actionTag('close')}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <div className="ipt-btn__section">
          <ul className="ipt-btn__list--row">
            <li>
              <FormTitle title={'태그'} />
            </li>
            {tagPopupNaviLinks.map((e, index) => (
              <li key={index + e.id}>
                <FormBasicRadio
                  name={'tagPopupNaviLinks Popup' + e.id}
                  id={'tagPopupNaviLinks Popup' + e.id}
                  label={e.title}
                  onChange={() => changeTypeTag(e)}
                  checked={selectedKey.id === e.id}
                />
              </li>
            ))}
          </ul>
        </div>
        <TagSelectedBox
          tagType={selectedKey}
          category={props.category}
          isOpen={tagOpen && selectedKey.id !== '' && selectedKey.id !== 'delete'}
          tagValueList={tagValueList}
          originTagList={props.originTagList}
          onChangeTagList={e => setTagValueList(() => e)}
        />
        <TagList
          tagItems={tagValueList}
          onTagItemClose={e => deleteTag(e)}
          onAllTagItemClose={() => setTagValueList(() => [])}
        />
        {/* </div> */}
      </Popup>
    </>
  )
}

export default TagTotalSearch
