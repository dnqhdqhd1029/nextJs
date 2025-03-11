import tempImg from '/public/assets/png/temp_198x122.png'
import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Image from '~/components/common/ui/Image'
import { TemplateType } from '~/stores/modules/contents/pressRelease/pressRelease'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const CustomTemplate = (props: TemplateType) => {
  const { templatePageData, templatePageDataTemplateOnChange, templatePageDataTemplateDelete, editorData } =
    usePressRelese()

  return (
    <li id={'CustomTemplate' + props.mailTemplateId + props.title}>
      <div className="template-ipt-btn__item-delete">
        <Button
          label={'삭제'}
          cate={'ico-only'}
          size={'s'}
          color={'secondary'}
          icoLeft={true}
          icoLeftData={icoSvgData.trash}
          icoSize={16}
          onClick={() => templatePageDataTemplateDelete(props.mailTemplateId)}
        />
      </div>
      <div className="template-ipt-btn__item">
        <input
          type="radio"
          name={props.mailTemplateId.toString() + 'CustomTemplate'}
          id={props.mailTemplateId.toString() + 'CustomTemplate'}
          checked={templatePageData.mailTemplateId === props.mailTemplateId && props.content === editorData}
          onChange={() => templatePageDataTemplateOnChange(props.mailTemplateId, props.content, editorData)}
        />
        <label htmlFor={props.mailTemplateId.toString() + 'CustomTemplate'}>
          <b className="item__thumb">
            <span className="item-thumb__img">
              <Image
                src={tempImg}
                width={198}
                height={122}
                alt="저장이미지"
              />
            </span>
          </b>
          <span className="item__label">{props.title}</span>
        </label>
      </div>
    </li>
  )
}

export default CustomTemplate
