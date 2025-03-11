/**
 * @file Guide/[code].tsx
 * @description 가이드 메인 페이지
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'

import componentData from './componentData.json'
import formData from './formData.json'
import layoutData from './layoutData.json'
import linkPageData from './linkPageData.json'
import reporterData from './reporterData.json'

import { PageType } from '~/types/common'

const Guide: PageType = () => {
  const DATA = [
    {
      id: 0,
      menu: 'UI 컴포넌트',
      list: componentData.data,
    },
    {
      id: 1,
      menu: 'UI 레이아웃',
      list: layoutData.data,
    },
    {
      id: 2,
      menu: '링크 페이지',
      list: linkPageData.data,
    },
    {
      id: 3,
      menu: '이메일 양식',
      list: formData.data,
    },
    {
      id: 4,
      menu: '언론인',
      list: reporterData.data,
    },
  ]

  const [index, setIndex] = useState(4)
  const [total, setTotal] = useState(0)
  const [del, setDel] = useState(0)
  const [ing, setIng] = useState(0)
  const [mod, setMod] = useState(0)
  const [finish, setFinish] = useState(0)

  const initCount = () => {
    setTotal(0)
    setDel(0)
    setIng(0)
    setMod(0)
    setFinish(0)
    calcProgress()
  }

  const calcProgress = () => {
    const $list = DATA[index].list

    setTotal($list.length)

    $list.map(item => {
      switch (item.state) {
        case 1:
          setIng(prev => prev + 1)
          break

        case 2:
          setMod(prev => prev + 1)
          break

        case 3:
          setFinish(prev => prev + 1)
          break
        case 4:
          setDel(prev => prev + 1)
          break

        default:
          break
      }
    })
  }

  const calcProgressWidth = (key: number) => {
    return Math.ceil((key / (total - del)) * 100) + '%'
  }

  useEffect(() => {
    initCount()
  }, [index])

  return (
    <>
      <h1 className="guide__title">가이드 페이지</h1>
      <div className="guide__container">
        <ul className="guide-tab__menus">
          {DATA.map(item => (
            <li
              className="guide-tab__menu"
              key={item.id}
            >
              <button
                type="button"
                className={`guide-tab__item ${index === item.id && 'is-active'}`}
                onClick={() => setIndex(item.id)}
              >
                {item.menu}
              </button>
            </li>
          ))}
        </ul>
        <div className="guide-tab__panel">
          <div className="guide-count__section">
            <p className="guide-count__item">전체 : {total}건</p>
            <p className="guide-count__item color-primary">진행 : {ing}건</p>
            <p className="guide-count__item color-success">수정 : {mod}건</p>
            <p className="guide-count__item color-danger">완료 : {finish}건</p>
            <p className="guide-count__item color-secondary">대기 : {total - ing - mod - finish - del}건</p>
            <p className="guide-count__item">취소 : {del}건</p>
          </div>

          <div>
            <div className="guide-progress">
              {['ing', 'mod', 'finish'].map((a, i) => {
                return (
                  <div
                    className={`
                      guide-progress-bar ${a === 'mod' ? 'bg-danger' : a === 'finish' ? 'bg-success' : 'bg-primary'}
                    `}
                    style={{
                      width: `${
                        a === 'ing'
                          ? calcProgressWidth(ing)
                          : a === 'mod'
                          ? calcProgressWidth(mod)
                          : calcProgressWidth(finish)
                      }`,
                    }}
                    key={i}
                  >
                    {a === 'ing' && ing > 0 && calcProgressWidth(ing)}
                    {a === 'mod' && mod > 0 && calcProgressWidth(mod)}
                    {a === 'finish' && finish > 0 && calcProgressWidth(finish)}
                  </div>
                )
              })}
            </div>

            <table>
              <colgroup>
                <col width={'10%'} />
                <col width={'15%'} />
                <col width={'10%'} />
                <col width={'20%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'15%'} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">1 depth</th>
                  <th>2 depth</th>
                  <th>화면ID</th>
                  <th>URL</th>
                  <th>Date</th>
                  <th>상태</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {DATA.filter(item => item.id === index).map(item =>
                  item.list?.map((d, idx) => (
                    <tr key={idx}>
                      <th scope="row">{d.depth1}</th>
                      <td>{d.depth2}</td>
                      <td>{(d as any).pageId ?? d.url} </td>
                      <td>
                        {item.id === 4 ? (
                          // item.id가 4일 때 특정 링크
                          <Link
                            href={`/${d.url}`}
                            legacyBehavior
                          >
                            <a>{d.url}</a>
                          </Link>
                        ) : item.id !== 3 ? (
                          // item.id가 3이 아닐 때 처리
                          d.state !== 4 &&
                          d.url.length > 0 && (
                            <Link
                              href={`/publishing/example/${index === 0 ? 'c/' : index === 1 ? 'l/' : 'p/'}${d.url}`}
                              legacyBehavior
                            >
                              <a>{d.url}</a>
                            </Link>
                          )
                        ) : (
                          // item.id가 3일 때 처리
                          <Link
                            href={`/email/${d.url}.html`}
                            legacyBehavior
                          >
                            <a>{d.url}</a>
                          </Link>
                        )}
                      </td>

                      <td>{d.date}</td>
                      <td
                        className={`color-${
                          d.state === 0
                            ? 'secondary'
                            : d.state === 1
                            ? 'primary'
                            : d.state === 2
                            ? 'success'
                            : d.state === 3
                            ? 'danger'
                            : 'line-through'
                        }`}
                      >
                        {d.state === 0
                          ? '대기'
                          : d.state === 1
                          ? '진행'
                          : d.state === 2
                          ? '수정'
                          : d.state === 3
                          ? '완료'
                          : '취소'}
                      </td>
                      <td>{d.etc}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Guide

Guide.PublishingLayout = 'GUIDE'
