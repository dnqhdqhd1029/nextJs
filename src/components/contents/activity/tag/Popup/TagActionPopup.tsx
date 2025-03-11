import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useTagActivity } from '~/utils/hooks/contents/activity/useTagActivity'

const TagActionPopup = () => {
  const {
    tagPopup,
    tagListParams,
    tagType,
    createTagPopupAction,
    editTagPopupAction,
    setInitTagPopupAction,
    inputValueOnChange,
  } = useTagActivity()

  return (
    <>
      <Popup
        width={500}
        isOpen={tagPopup.isOpen && tagPopup.type !== 'delete'}
        onClose={() => setInitTagPopupAction()}
        hasCloseButton
        title={tagPopup.title}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={tagPopup.confirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() =>
                tagPopup.type === 'create'
                  ? createTagPopupAction(tagPopup, tagListParams, tagType)
                  : editTagPopupAction(tagPopup, tagListParams, tagType)
              }
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setInitTagPopupAction()}
            />
          </div>
        }
      >
        <ul>
          <li>
            <div className="form-social-media__section">
              <FormTitle
                title={'태그'}
                required={true}
              />
              <FormInputText
                required={true}
                maxLength={30}
                onChange={e => inputValueOnChange(e.target.value, tagPopup)}
                failed={tagPopup.valueErr !== ''}
                msg={tagPopup.valueErr}
                value={tagPopup.value}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default TagActionPopup
