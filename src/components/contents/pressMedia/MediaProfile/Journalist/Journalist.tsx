import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import JournalistList from '~/components/contents/pressMedia/MediaProfile/Journalist/JournalList'
import SubMedialList from '~/components/contents/pressMedia/MediaProfile/Journalist/SubMedialList'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const Journalist = () => {
  const {
    mediaGroupTab,
    mediaGroupJournalistCountPage,
    mediaGroupSubMediaListCountPage,
    mediaIdKeyParam,
    setMediaGroupTabActionAction,
    moveToTotalJournalList,
  } = useMediaProfile()
  const { pressSearchOption } = useAppSelector(state => state.pressMediaSearchOptionsSlice)

  return (
    <div className="flexible-item__group">
      <div className="flexible-item__header">
        <h4 className="font-heading--h5">언론인</h4>
        <Button
          label={'전체 언론인'}
          cate={'link-text-arrow'}
          size={'m'}
          color={'secondary'}
          icoRight={true}
          icoRightData={icoSvgData.chevronRight}
          onClick={() => mediaIdKeyParam && moveToTotalJournalList(mediaIdKeyParam, pressSearchOption)}
        />
      </div>
      <div className="flexible-item__contents">
        <div className="tabs__section type1-small">
          <div className="tabs-menu__group">
            <ul className="tabs-menu__list">
              <li className={mediaGroupTab !== 'media' ? 'is-active' : ''}>
                <button
                  type="button"
                  className="tabs-menu__btn"
                  onClick={() => setMediaGroupTabActionAction('journal')}
                >
                  <span className="tabs-menu__name">언론인</span>
                  <span className="tabs-menu__number">{mediaGroupJournalistCountPage.totalCount}</span>
                </button>
              </li>
              <li className={mediaGroupTab === 'media' ? 'is-active' : ''}>
                <button
                  type="button"
                  className="tabs-menu__btn"
                  onClick={() => setMediaGroupTabActionAction('media')}
                >
                  <span className="tabs-menu__name">계열 미디어</span>
                  <span className="tabs-menu__number">{mediaGroupSubMediaListCountPage.totalCount}</span>
                </button>
              </li>
            </ul>
          </div>
          {mediaGroupTab !== 'media' ? <JournalistList /> : <SubMedialList />}
        </div>
      </div>
    </div>
  )
}

export default Journalist
