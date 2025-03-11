import Popup from '~/components/common/ui/Popup'
import { IcoClipboard2Data02, IcoFileEarmarkText02, IcoSendCheck02 } from '~/publishing/components/common/ui/IcoGroup'

interface Props {
  onClose: () => void
  onConfirm: () => void
}

const ReleaseProcedurePopup = ({ onClose, onConfirm }: Props) => {
  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButtonLoading={false}
        hasCloseButton
        width={1010}
        title={'뉴스와이어 배포 절차'}
        buttons={<></>}
      >
        <div style={{ padding: '24px 0' }}>
          <div className="activity-distribute__group">
            <ul className="activity-distribute__steps justify-content__center">
              <li>
                <div className="activity-distribute__item">
                  <div className="distribute-item__ico">
                    <IcoFileEarmarkText02 />
                  </div>
                  <div className="distribute-item__name">검수</div>
                  <div className="distribute-item__desc">
                    <p>등록한 보도자료가 뉴스 가치 있고 오류가 없으면 뉴스와이어에 게재하고 메시지로 알려드립니다.</p>
                    <p>
                      문법이나 문맥에 오류가 있는 경우, 수정합니다. 사소한 수정은 회원님과 상의하지 않지만, 중요한
                      내용에 손을 대야 하는 경우 사전 협의를 하거나 수정 후 컨펌을 요청합니다.
                    </p>
                    <p>
                      등록한 보도자료가 편집 가이드라인에 부합하지 않으면 반려합니다. 반려하면 쿠폰은 차감하지 않습니다.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="activity-distribute__item">
                  <div className="distribute-item__ico">
                    <IcoSendCheck02 />
                  </div>
                  <div className="distribute-item__name">배포</div>
                  <div className="distribute-item__desc">
                    <p>
                      스탠다드, 프리미엄 서비스를 이용하는 보도자료는 기자와 편집국에 보도자료를 직접 메일로 전송합니다.
                      따라서 기자가 근무하는 평일에 배포하며, 휴일에는 배포할 수 없습니다.
                    </p>
                    <p>
                      뉴스와이어에 게재된 보도자료는 매일 09:30 11:30 14:30 16:00에 언론인 등 회원에게 이메일로 발송하는
                      MY뉴스에 노출됩니다.
                    </p>
                    <p>16:00 이후 게재된 보도자료는 다음날 MY뉴스에 노출됩니다.</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="activity-distribute__item">
                  <div className="distribute-item__ico">
                    <IcoClipboard2Data02 />
                  </div>
                  <div className="distribute-item__name">결과 보고서</div>
                  <div className="distribute-item__desc">
                    <p>
                      스탠다드 이상 서비스는 [no19]개 매체를 모니터링해 기사화된 뉴스와 소셜 공유 현황을 결과 보고서로
                      제공합니다.
                    </p>
                    <p>
                      보고서가 완성되면 48시간(휴일 제외) 뒤 보고서가 완성됐다고 회원님에게 메일로 알려드립니다.
                      회원님은 보도자료 관리 페이지에서 보고서를 다운로드 할 수 있습니다.
                    </p>
                    <p>
                      베이직 보고서는 제휴 미디어에 노출된 전문만 제공되며, 자동 생성되므로 게재 직후 볼 수 있습니다.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default ReleaseProcedurePopup
