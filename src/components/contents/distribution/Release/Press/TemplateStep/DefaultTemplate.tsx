import { TemplateType } from '~/stores/modules/contents/pressRelease/pressRelease'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const DefaultTemplate = (props: TemplateType) => {
  const { templatePageData, templatePageDataTemplateOnChange, editorData } = usePressRelese()

  return (
    <li id={'DefaultTemplate_' + props.mailTemplateId + props.title}>
      <div className="template-ipt-btn__item">
        <input
          type="radio"
          name={props.mailTemplateId.toString() + 'DefaultTemplate_Step'}
          id={props.mailTemplateId.toString() + 'DefaultTemplate_Step'}
          checked={templatePageData.mailTemplateId === props.mailTemplateId && props.content === editorData}
          onChange={() => templatePageDataTemplateOnChange(props.mailTemplateId, props.content, editorData)}
        />
        <label htmlFor={props.mailTemplateId.toString() + 'DefaultTemplate_Step'}>
          <b className="item__thumb">
            <span className="item-thumb__img"></span>
          </b>
          <span className="item__label">{props.title}</span>
        </label>
      </div>
    </li>
  )
}

export default DefaultTemplate
