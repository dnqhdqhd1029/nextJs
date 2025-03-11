import { forwardRef, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import { IcoArrowMove } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Loader from '~/components/common/ui/Loader'
import Select from '~/components/common/ui/Select'
import {
  defaultKeywordMonitoringSubType,
  defaultKeywordMonitoringType,
} from '~/components/contents/dashboard/defaultData'
import { GridItemOption } from '~/stores/modules/contents/dashboard/dashboardSlice'
import type { SelectListOptionItem } from '~/types/common'
import { useDashboardAction } from '~/utils/hooks/contents/dashboard/useDashboardAction'

interface Props {
  gadgetItem: GridItemOption
  gadgetKey: string
}
const SettingPage = (props: Props) => {
  const {
    gridState,
    keywordMonitroingList,
    keywordMonitoring,
    setGadgetLeftCancelAction,
    setGadgetRightCancelAction,
    setGadgetLeftSettingAction,
    setGadgetRightSettingAction,
    setGadgetDeleteAction,
    registerGadget,
  } = useDashboardAction()
  const settingContainerRef = useRef<HTMLDivElement>(null)
  const [isSettingShow, setIsSettingShow] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState<SelectListOptionItem>({ id: '10', name: '10' })
  const [monitoringId, setMonitoringId] = useState<SelectListOptionItem>({ id: '', name: '' })
  const [monitoringType, setMonitoringType] = useState<SelectListOptionItem>({ id: 'news', name: '뉴스 목록' })
  const [monitoringSubType, setMonitoringSubType] = useState<SelectListOptionItem>({ id: 'line', name: '선형 그래프' })
  const [monitoringIdErr, setMonitoringIdErr] = useState('')

  const init = async () => {
    const findId =
      keywordMonitroingList && keywordMonitroingList.length > 0
        ? keywordMonitroingList?.find(e => e.id.toString() === props.gadgetItem.keyId.toString())
        : { id: '', name: '선택' }
    const findType = defaultKeywordMonitoringType.find(e => e.id.toString() === props.gadgetItem.type.toString())
    const findSubType = defaultKeywordMonitoringSubType.find(
      e => e.id.toString() === props.gadgetItem.subType.toString()
    )
    setCount({ id: props.gadgetItem.count.toString(), name: props.gadgetItem.count.toString() })
    setMonitoringId(findId ? findId : { id: '', name: '선택' })
    setMonitoringType(findType ? findType : { id: 'news', name: '뉴스 목록' })
    setMonitoringSubType(findSubType ? findSubType : { id: 'line', name: '선형 그래프' })
    setMonitoringIdErr('')
  }

  const registerGadgetAction = async () => {
    setIsLoading(() => true)
    const res = await registerGadget(
      gridState,
      props.gadgetItem,
      count.id,
      monitoringId,
      monitoringType.id,
      monitoringSubType.id,
      props.gadgetKey
    )
    if (res !== '0000') {
      setMonitoringIdErr(() => '모니터링을 선택해주세요')
    }
    setIsLoading(() => false)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (settingContainerRef.current && !settingContainerRef.current.contains(e.target as Node)) {
        setIsSettingShow(() => false)
      }
    },
    [isSettingShow]
  )

  useEffect(() => {
    if (
      props.gadgetItem.status === '' &&
      props.gadgetItem.keyId &&
      props.gadgetItem.type &&
      props.gadgetItem.subType &&
      props.gadgetItem.count
    )
      init()
  }, [props.gadgetItem.status])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className="draggable__container"
      style={{
        height:
          props.gadgetItem.id &&
          props.gadgetItem.id.length > 0 &&
          props.gadgetItem.id.split.length > 0 &&
          props.gadgetItem.id.split('-')[0] &&
          props.gadgetItem.id.split('-')[0] === 'keywordMonitoring'
            ? 380
            : 300,
        margin: '14px 0 44px 0',
      }}
    >
      <div
        className="draggable__header"
        style={{ zIndex: 2 }}
      >
        <div className="draggable__header-mover"></div>
        <h2 className="draggable-header__title">{props.gadgetItem?.title}</h2>
        <div className="draggable-header__buttons">
          <IcoArrowMove />
          <div
            className="select__section select-type1-small select-ico-only select-align-right"
            ref={settingContainerRef}
          >
            <button
              className="select__label ico-size16"
              onClick={() => setIsSettingShow(!isSettingShow)}
            >
              <span className="select__label-text">설정</span>
              <IcoSvg data={icoSvgData.threeDotsVertical} />
            </button>

            <div className={cn('select-option__section', { 'display-block': isSettingShow })}>
              <div className="select-option__area">
                <ul className="select-option__group">
                  <li>
                    <button
                      className="select-option__item"
                      onClick={() =>
                        setGadgetDeleteAction(gridState, props.gadgetItem, keywordMonitoring, props.gadgetKey)
                      }
                    >
                      <span className="select-option__item-text">삭제하기</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="draggable__contents">
        <div
          className="draggable__contents-dimm"
          style={{ display: isLoading ? 'block' : 'none' }}
        >
          <Backdrop style={{ background: '#fff', position: 'absolute', zIndex: 1 }} />
          <Loader
            screen={'absolute'}
            zIndex={2}
          />
        </div>
        <div className="draggable-select__section-container">
          <div className={cn('draggable-select__section')}>
            <ul>
              {props.gadgetItem.id &&
              props.gadgetItem.id.length > 0 &&
              props.gadgetItem.id.split.length > 0 &&
              props.gadgetItem.id.split('-')[0] &&
              props.gadgetItem.id.split('-')[0] === 'keywordMonitoring' ? (
                <Fragment>
                  <li>
                    <div className="draggable-select__group">
                      <div className="draggable-select__title">모니터링</div>
                      <div className="draggable-select__select">
                        <div className="select-form__section select-form-btn">
                          <Select
                            listDirection={'down'}
                            listMaxHeight={180}
                            options={keywordMonitroingList}
                            onChange={(option: SelectListOptionItem) => setMonitoringId(() => option)}
                            value={monitoringId}
                            failed={monitoringIdErr !== ''}
                            msg={monitoringIdErr}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="draggable-select__group">
                      <div className="draggable-select__title">유형</div>
                      <div className="draggable-select__select">
                        <div className="select-form__section select-form-btn">
                          <Select
                            listDirection={'down'}
                            options={defaultKeywordMonitoringType}
                            onChange={(option: SelectListOptionItem) => setMonitoringType(() => option)}
                            value={monitoringType}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  {monitoringType.id === 'news' ? (
                    <li>
                      <div className="draggable-select__group">
                        <div className="draggable-select__title">노출 건수 선택</div>
                        <div className="draggable-select__select">
                          <div className="select-form__section select-form-btn">
                            <Select
                              listDirection={'down'}
                              listMaxHeight={140}
                              options={Array.from({ length: 30 }, (_, i) => {
                                return { id: (i + 1).toString(), name: (i + 1).toString() }
                              })}
                              onChange={(option: SelectListOptionItem) => setCount(() => option)}
                              value={count}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <div className="draggable-select__group">
                        <div className="draggable-select__title">종류</div>
                        <div className="draggable-select__select">
                          <div className="select-form__section select-form-btn">
                            <Select
                              listDirection={'down'}
                              options={defaultKeywordMonitoringSubType}
                              onChange={(option: SelectListOptionItem) => setMonitoringSubType(() => option)}
                              value={monitoringSubType}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </Fragment>
              ) : (
                <li>
                  <div className="draggable-select__group">
                    <div className="draggable-select__title">노출 건수 선택</div>
                    <div className="draggable-select__select">
                      <div className="select-form__section select-form-btn">
                        <Select
                          listDirection={'down'}
                          listMaxHeight={140}
                          options={Array.from({ length: 30 }, (_, i) => {
                            return { id: (i + 1).toString(), name: (i + 1).toString() }
                          })}
                          onChange={(option: SelectListOptionItem) => setCount(() => option)}
                          value={count}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )}
              <li>
                <div className="draggable-select__save display-flex justify-content__flex-start align-items__center">
                  <Button
                    label={'확인'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={() => registerGadgetAction()}
                    style={{ marginLeft: '10px' }}
                  />
                  {props.gadgetItem.keyId !== '' && (
                    <Button
                      label={'취소'}
                      cate={'default'}
                      size={'m'}
                      color={'link-dark'}
                      disabled={isLoading}
                      onClick={() =>
                        props.gadgetKey === 'left'
                          ? setGadgetLeftCancelAction(gridState, props.gadgetItem)
                          : setGadgetRightCancelAction(gridState, props.gadgetItem)
                      }
                    />
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingPage
