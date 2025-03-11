import moment from 'moment'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { getCurrencyFormat } from '~/utils/common/number'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'
const ContentMailReceiver = () => {
  const { contentsTab, contentsActionStatusList, contentsActionStatusDetail } = useRecordActivity()

  return (
    <>
      {contentsTab === 'status' && (
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            <ul className="interval-mt20">
              {Number(contentsActionStatusDetail.totalCount) > 0 && (
                <li>
                  <p className="check-text__group">
                    <IcoSvg data={icoSvgData.checkLg} />
                    <span className="check-text__text">통계 수집 완료</span>
                  </p>
                </li>
              )}
              <li>
                <div className="table-type2__section">
                  <table>
                    <caption>caption</caption>
                    <thead>
                      <tr>
                        <th scope="col">총 발송</th>
                        <th scope="col">성공</th>
                        <th scope="col">
                          <FormTitle
                            title="오픈"
                            tooltip={true}
                          >
                            <Tooltips
                              tooltipId={'tt1-1'}
                              tooltipPlace={'top'}
                              tooltipHtml={`상대방이 메일을 오픈했는지 알 수 있습니다. 네이버 메일 등 일부 메일은 오픈 확인이 안 될 수 있습니다.`}
                              tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                            />
                          </FormTitle>
                        </th>
                        <th scope="col">클릭</th>
                        <th scope="col">
                          <FormTitle
                            title="수신거부"
                            tooltip={true}
                          >
                            <Tooltips
                              tooltipId={'tt1-2'}
                              tooltipPlace={'top'}
                              tooltipHtml={`상대방이 메일 하단의 수신거부 기능을 클릭해 이메일을 더 이상 받지 않겠다는 의사를 표시한 경우에 수신 거부로 표시됩니다.`}
                              tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                            />
                          </FormTitle>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getCurrencyFormat(Number(contentsActionStatusDetail.totalCount))}</td>
                        <td>{getCurrencyFormat(Number(contentsActionStatusDetail.successCount))}</td>
                        <td>{getCurrencyFormat(Number(contentsActionStatusDetail.failCount))}</td>
                        <td>{getCurrencyFormat(Number(contentsActionStatusDetail.openCount))}</td>
                        <td>{getCurrencyFormat(Number(contentsActionStatusDetail.rejectCount))}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <div className="table-type1__section">
                  <table>
                    <caption>caption</caption>
                    <thead>
                      <tr>
                        <th scope="col">받는사람</th>
                        <th scope="col">보낸시간</th>
                        <th scope="col">상태</th>
                        <th scope="col">오픈</th>
                        <th scope="col">클릭</th>
                        <th scope="col">거부</th>
                        <th scope="col">반송</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentsActionStatusList &&
                        contentsActionStatusList.length > 0 &&
                        contentsActionStatusList.map(e => (
                          <tr key={'contentsActionStatusList' + e.mailReceiverId}>
                            <td>
                              <Button
                                elem="a"
                                url={e.email}
                                label={e.mediaName + e.receiverName}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                //onClick={() => ownerFunction(e)}
                              />
                            </td>
                            <td>{moment(e.sentAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{e.mailerResponseMessage}</td>
                            <td>{/*<IcoSvg data={icoSvgData.checkThick} />*/}</td>
                            <td>{/*<IcoSvg data={icoSvgData.checkThick} />*/}</td>
                            <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                            <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
export default ContentMailReceiver
