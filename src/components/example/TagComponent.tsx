/**
 * @file tag.tsx
 * @description 태그 테스트
 */

import FormInputText from '~/components/common/ui/FormInputText'
import MbTagSearch from '~/components/contents/common/forms/MbTagSearch'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'

export const pressTagSearchList: TagSearchListType[] = [
  {
    title: '이름',
    key: 'press_nameTags',
    functionType: 'inputSearch',
    searchListData: [],
  },
]

const TagComponent = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
  }
  return (
    <>
      <div style={{ padding: '50px', width: '400px' }}>
        {pressTagSearchList.map((item, index) => (
          <li key={`press-general-${item.key}-${index}`}>
            <MbTagSearch
              title={item.title}
              tooltipNode={item.tooltipNode}
              onTagListChange={(tagItems: MbTagSearchTagItem[]) => console.log(tagItems)}
              // stringForReset={resetAllValues}
              // storedTagItems={getTagItems(item.apiTitle, receivedPressSearchValues)}
              functionType={item.functionType}
            />
          </li>
        ))}
      </div>
      <div style={{ padding: '50px', width: '400px' }}>
        <input
          style={{ border: '1px solid red', width: '100%', padding: '5px 10px' }}
          onChange={handleChange}
        />
      </div>
      <div style={{ padding: '50px', width: '400px' }}>
        <FormInputText onChange={handleChange} />
      </div>
    </>
  )
}

export default TagComponent
