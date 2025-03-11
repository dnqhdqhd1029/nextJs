import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Select from '~/components/common/ui/Select'
import { pressSocialListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import type { SelectListOptionItem } from '~/types/common'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const SocialItem = (props: pressSocialListProps) => {
  const {
    jrnlstSocialUserAddList,
    pressSocialList,
    pressSocialListTypeAction,
    pressSocialListLinkAction,
    pressSocialListDeleteAction,
  } = useRegisterPressMedia()

  return (
    <li>
      <div className="form-social-media__item">
        <div className="select">
          <Select
            options={jrnlstSocialUserAddList}
            listDirection={'up'}
            onChange={(option: SelectListOptionItem) => pressSocialListTypeAction(props, option, pressSocialList)}
            value={props.typeName}
            failed={props.socialErr !== ''}
            msg={props.socialErr}
          />
        </div>
        <div className="input">
          <FormInputText
            placeholder="내용"
            value={props.link}
            failed={props.linkErr !== ''}
            msg={props.linkErr}
            onChange={e => pressSocialListLinkAction(props, e.target.value, pressSocialList)}
          />
        </div>
        <div className="button">
          <Button
            label={'삭제'}
            cate={'default'}
            size={'m'}
            color={'link'}
            onClick={() => pressSocialListDeleteAction(props, pressSocialList)}
          />
        </div>
      </div>
    </li>
  )
}

export default SocialItem
