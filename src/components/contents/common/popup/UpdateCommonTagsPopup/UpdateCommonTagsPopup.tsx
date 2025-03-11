/**
 * @file UpdateTagsOfActivityPopup.tsx
 * @description 다수 뉴스의 태그 수정
 */

import { ChangeEvent, useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Tag from '~/components/common/ui/Tag'
import TagList from '~/components/common/ui/TagList'
import MbTagSearchCreateLayer from '~/components/contents/common/layer/MbTagSearchCreateLayer/MbTagSearchCreateLayer'
import { BaseResponseCommonObject, RequestTaggingDto, TagDto } from '~/types/api/service'
import type { TagSearchCreateLayerItem } from '~/types/contents/Common'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import { usePostTaggingAdd } from '~/utils/api/tagging/usePostTaggingAdd'
import { usePostTaggingExcept } from '~/utils/api/tagging/usePostTaggingExcept'
import { usePostTaggingReset } from '~/utils/api/tagging/usePostTaggingReset'
import { openToast } from '~/utils/common/toast'

type UpdateMode = 'ADD' | 'EXCEPT' | 'REPLACE'

interface Props {
  isOpen: boolean
  category: 'NEWS' | 'ACTION'
  checkedItems: number[]
  onClose: () => void
  onJobSuccess?: () => void
}

const UpdateCommonTagsPopup = ({ isOpen, checkedItems, category, onClose, onJobSuccess }: Props) => {
  const [UpdateMode, setUpdateMode] = useState<UpdateMode>('ADD')
  const [taggingList, setTaggingList] = useState<MbTagSearchTagItem[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const afterJob = (response: BaseResponseCommonObject) => {
    const { status, message, data } = response
    if (status === 'S') {
      openToast(message?.message, 'success')
      onJobSuccess && onJobSuccess()
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 태깅하기
  const addTaggingToNews = usePostTaggingAdd({
    onSuccess: afterJob,
  })

  // 태깅 제외하기
  const exceptTaggingToNews = usePostTaggingExcept({
    onSuccess: afterJob,
  })

  // 태깅 리셋하기
  const resetTaggingToNews = usePostTaggingReset({
    onSuccess: afterJob,
  })

  const handleClose = () => {
    onClose()
  }

  const handleTagUpdate = () => {
    if (taggingList.length === 0) {
      setErrorMessage('태그를 선택해주세요.')
      return
    }

    const tagIdList = taggingList.map(item => Number(item.id))
    const targetIdList = checkedItems.map(item => Number(item))

    const requestTaggingDto: RequestTaggingDto = {
      tagIdList,
      category,
      // targetIdList,
      targetList: [],
    }

    switch (UpdateMode) {
      case 'ADD':
        //addTaggingToNews.mutate(requestTaggingDto)
        break
      case 'EXCEPT':
        exceptTaggingToNews.mutate(requestTaggingDto)
        break
      case 'REPLACE':
        resetTaggingToNews.mutate(requestTaggingDto)
        break
    }
  }

  const handleUpdateModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateMode(e.target.value as UpdateMode)
  }

  const handleTagExcept = (item: MbTagSearchTagItem) => {
    const newTaggingList = taggingList.filter(tagItem => tagItem.id !== item.id)
    setTaggingList(newTaggingList)
  }

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) => {
    const isChecked = e.target.checked

    if (isChecked) {
      const newTagItem: MbTagSearchTagItem = {
        id: item.id,
        label: item.name,
      }
      if (taggingList.length > 0) {
        setTaggingList([...taggingList, newTagItem])
      } else {
        setTaggingList([newTagItem])
      }
    } else {
      const newTaggingList = taggingList.filter(tagItem => tagItem.id !== item.id)
      setTaggingList(newTaggingList)
    }
  }

  const handleTagCreateSuccess = (item: TagDto) => {
    const newMbTagSearchTagItem: MbTagSearchTagItem = {
      id: item.tagId?.toString() ?? '',
      label: item.name ?? '',
    }
    setTaggingList([...taggingList, newMbTagSearchTagItem])
  }

  const reset = () => {
    setTaggingList([])
    setUpdateMode('ADD')
    setErrorMessage('')
  }

  useEffect(() => {
    reset()
  }, [isOpen])

  if (!checkedItems || checkedItems.length === 0 || !category) {
    return null
  }

  return (
    <Popup
      isOpen={isOpen}
      title={`${checkedItems.length}개 뉴스의 태그 입력`}
      onClose={handleClose}
      width={450}
      hasCloseButton
      contentSectionOverflow={'visible'}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={handleClose}
          />
          <Button
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={handleTagUpdate}
          />
        </div>
      }
    >
      <ul>
        <li>
          <div className="ipt-btn__section">
            <FormTitle title={'태그'} />
            <ul className="ipt-btn__list--row">
              <li>
                <FormBasicRadio
                  label="추가"
                  value="ADD"
                  checked={UpdateMode === 'ADD'}
                  onChange={handleUpdateModeChange}
                />
              </li>
              <li>
                <FormBasicRadio
                  label="제외"
                  value="EXCEPT"
                  checked={UpdateMode === 'EXCEPT'}
                  onChange={handleUpdateModeChange}
                />
              </li>
              <li>
                <FormBasicRadio
                  label="대체(모두 제외 후 추가)"
                  value="REPLACE"
                  checked={UpdateMode === 'REPLACE'}
                  onChange={handleUpdateModeChange}
                />
              </li>
            </ul>
          </div>

          <div className="select-form__section select-form-btn">
            <MbTagSearchCreateLayer
              isOpen={true}
              category={category}
              mode="FLAT"
              parentTagItems={taggingList}
              onTagStatusChange={handleTagChange}
              onCreateSuccess={handleTagCreateSuccess}
              errorMessage={errorMessage}
            />
            {taggingList && taggingList.length > 0 && (
              <div className="title-select__tags">
                <TagList
                  tagItems={taggingList}
                  onTagItemClose={handleTagExcept}
                />
              </div>
            )}
          </div>
        </li>
      </ul>
    </Popup>
  )
}

export default UpdateCommonTagsPopup
