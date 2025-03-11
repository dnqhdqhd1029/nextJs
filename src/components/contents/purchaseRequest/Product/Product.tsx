import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { userCountList } from '~/components/contents/purchaseRequest/defaultData'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const Product = () => {
  const {
    productInfo,
    resizeTextarea,
    onKeyEnter,
    textareaHeight,
    setProductInfoActionTypeAction,
    setProductInfoActionUserCountAction,
    setProductInfoActionDetailAction,
  } = usePurchaseRequest()

  return (
    <>
      <li style={{ marginTop: 12 }}>
        <div className="form-title-btn__group">
          <p className="font-body__regular fw700">상품</p>
        </div>
        <ul className="grid-col2">
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'상품 종류'}
                required={true}
              />
              <Select
                options={productInfo.typeList}
                value={productInfo.type}
                onChange={e => setProductInfoActionTypeAction(e, productInfo)}
              />
            </div>
          </li>
          {productInfo.isUser && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle
                  title={'사용자 숫자'}
                  required={true}
                />
                <Select
                  options={userCountList}
                  value={productInfo.userCount}
                  onChange={e => setProductInfoActionUserCountAction(e, productInfo)}
                />
              </div>
            </li>
          )}
        </ul>
      </li>
      <li>
        <FormTitle title={'요청사항'} />
        <div className="textarea__area">
          <div className="textarea__group">
            <textarea
              style={{
                all: 'unset',
                display: 'block',
                width: '100%',
                // @ts-ignore
                height: `${({ row, theme }) => +theme.listSize * row + 4}px`,
                overflowWrap: 'break-word',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                resize: 'none',
                fontSize: '1.4rem',
                color: '#202121',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: 1.5,
                textDecoration: 'none',
                padding: '6px 12px',
              }}
              autoComplete="off"
              onInput={e => resizeTextarea(e)}
              onKeyDown={e => onKeyEnter(e)}
              rows={textareaHeight.row}
              value={productInfo.detail}
              onChange={e => setProductInfoActionDetailAction(e.target.value, productInfo)}
            />
          </div>
        </div>
      </li>
    </>
  )
}

export default Product
