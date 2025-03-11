/**
 * @file LnbPopupList.tsx
 * @description LnbPopupList
 */

interface Props {
  data: boolean
}

import FormMsg from '../ui/FormMsg'

import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'

const LnbPopupList = ({ data }: Props) => {
  return (
    <div className="popup-type-list__section">
      {/* 에러 발생 시, is-failed 클래스 추가  */}
      <div className="popup-type-list__search is-failed">
        <FormInputSearch placeholder={'검색 또는 새 목록 만들기'} />
        <FormMsg msg={'에러메세지'} />
      </div>

      {/* 데이터 리스트 true 있을 때 / false 없을 때 */}
      <div className="popup-type-list__group">
        {data ? (
          <ul className="popup-type-list__checkbox">
            <li>
              {/* 아이콘이 있을 때, type-ico */}
              <div className="popup-type-list__checkbox-item type-ico">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck01"
                    id="ck01"
                    label="일간지 시사정치 담당기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck02"
                    id="ck02"
                    label="코스닥 회사 담당 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item type-ico">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck03"
                    id="ck03"
                    label="국회 출입 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item type-ico">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck04"
                    id="ck04"
                    label="경제/경영 잡지 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item type-ico">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck05"
                    id="ck05"
                    label="영자지 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                {/* disabled 일 때 툴팁 적용 */}
                <Tooltips
                  tooltipId={'tt10-1'}
                  tooltipPlace={'top'}
                  tooltipHtml={'공개(타인이 보고 사용할 <br />수 있지만, 수정하거나 <br />추가를 할 수 없음)'}
                  tooltipComponent={
                    <div className="ipt-checkbox-ico__group">
                      <FormInputBtn
                        type="checkbox"
                        name="ck06"
                        id="ck06"
                        label="경제신문 여성 기자"
                        disabled={true}
                        checked={true}
                      />
                      <div className="ipt-checkbox-ico__person">
                        <IcoSvg data={icoSvgData.personLineBroken} />
                      </div>
                    </div>
                  }
                />
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item type-ico">
                <Tooltips
                  tooltipId={'tt10-2'}
                  tooltipPlace={'top'}
                  tooltipHtml={'공개(타인이 보고 사용할 <br />수 있지만, 수정하거나 <br />추가를 할 수 없음)'}
                  tooltipComponent={
                    <div className="ipt-checkbox-ico__group">
                      <FormInputBtn
                        type="checkbox"
                        name="ck07"
                        id="ck07"
                        label="지상파 아나운서"
                        disabled={true}
                      />
                      <div className="ipt-checkbox-ico__person">
                        <IcoSvg data={icoSvgData.personLineBroken} />
                      </div>
                    </div>
                  }
                />
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck08"
                    id="ck08"
                    label="중소기업 담당 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck09"
                    id="ck09"
                    label="패션/뷰티/푸드 잡지 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck10"
                    id="ck10"
                    label="주식/증권 전문 미디어"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item type-ico">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck11"
                    id="ck11"
                    label="종편 방송기자 그룹"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="popup-type-list__checkbox-item">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck12"
                    id="ck12"
                    label="여성 잡지 기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ) : (
          <div className="popup-type-list__nodata">
            <p className="popup-type-list__nodata-text">찾는 목록이 없습니다.</p>
            <button
              type="button"
              className="popup-type-list__nodata-button"
            >
              <span className="label keyword">주요 인터넷 신문기자</span>
              <span className="label">새 목록 만들기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

LnbPopupList.defaultProps = {
  data: true,
}

export default LnbPopupList
