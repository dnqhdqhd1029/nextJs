/**
 * @file LnbCustomSearch3.tsx
 * @description LnbCustomSearch3
 */

interface LnbCustomSearch3Props {
  header?: boolean
  title?: string
}

const LnbCustomSearch3 = ({ header, title }: LnbCustomSearch3Props) => {
  return (
    <div className="lnb-search__section">
      {header ? (
        <div className="lnb-search-result__header">
          <h2 className="lnb-search-result__title">{title}</h2>
        </div>
      ) : (
        <h2 className="hidden">메뉴명 숨김처리</h2>
      )}
    </div>
  )
}

LnbCustomSearch3.defaultProps = {
  header: true,
}

export default LnbCustomSearch3
