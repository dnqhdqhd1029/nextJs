import Skeleton from '~/components/common/ui/Skeleton'

const MbSideListLoader = () => {
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <Skeleton
            width="130px"
            height="28px"
          />
        </div>
        <div className="ipt-btn__section type-reverse">
          <Skeleton
            width="60px"
            height="24px"
          />
        </div>
      </div>
      <div className="aside-search__contents">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            className="aside-search__accordion"
            key={i}
          >
            <div className="accordion-type1__group">
              <div className="accordion-type1__btn">
                <Skeleton
                  width="38px"
                  height="21px"
                />
              </div>
              <div className="accordion-type1-panel__group display-block">
                {Array.from({ length: 10 }).map((_, j) => (
                  <div key={j}>
                    <Skeleton
                      width="100%"
                      height="21px"
                      wrapperStyle={{
                        width: '100%',
                        padding: '5px 0',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MbSideListLoader
