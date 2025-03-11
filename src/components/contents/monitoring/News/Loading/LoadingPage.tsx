import Skeleton from '~/components/common/ui/Skeleton'

const LoadingPage = () => {
  return (
    <div
      className="position-absolute"
      style={{ left: 0, right: 0, top: 0, bottom: 0, background: '#fff' }}
    >
      <div className="mb-contents">
        <div className="activity__section">
          <div className="mb-contents-header__section type-control">
            <div className="common-title__section">
              <div className="common-title__group">
                <div className="common-title__path">
                  <Skeleton
                    width={'28px'}
                    height={'28px'}
                  />
                </div>
                <div className="common-title__buttons">
                  <Skeleton
                    width={'57.77px'}
                    height={'28px'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="monitoring__section">
            <div className="aside-monitoring__section">
              <ul className="interval-mt28">
                <li>
                  <ul className="interval-mt16">
                    <li>
                      <ul className="interval-mt8">
                        <li className="display-flex justify-content__flex-start">
                          <Skeleton
                            width={'200px'}
                            height={'21px'}
                          />
                        </li>
                        <li>
                          <div className="monitoring-header__title">
                            <Skeleton
                              width={'660px'}
                              height={'27px'}
                              wrapperStyle={{
                                display: 'block',
                              }}
                            />
                          </div>
                        </li>
                        <li>
                          <ul className="grid-col2 type-interval20">
                            <li>
                              <dl className="dl-table-type1__section">
                                <dt>
                                  <Skeleton
                                    width={'42px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dt>
                                <dd>
                                  <Skeleton
                                    width={'160px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dd>
                                <dt>
                                  <Skeleton
                                    width={'42px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dt>
                                <dd>
                                  <Skeleton
                                    width={'160px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dd>
                                <dt>
                                  <Skeleton
                                    width={'42px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dt>
                                <dd>
                                  <Skeleton
                                    width={'160px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="dl-table-type1__section">
                                <dt>
                                  <Skeleton
                                    width={'42px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dt>
                                <dd>
                                  <Skeleton
                                    width={'160px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dd>
                                <dt>
                                  <Skeleton
                                    width={'42px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dt>
                                <dd>
                                  <Skeleton
                                    width={'160px'}
                                    height={'21px'}
                                    wrapperStyle={{
                                      display: 'block',
                                    }}
                                  />
                                </dd>
                              </dl>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="aside-monitoring__buttons">
                        <li>
                          <Skeleton
                            width={'135.5px'}
                            height={'35px'}
                            wrapperStyle={{
                              display: 'block',
                            }}
                          />
                        </li>
                        <li>
                          <Skeleton
                            width={'67.77px'}
                            height={'35px'}
                            wrapperStyle={{
                              display: 'block',
                            }}
                          />
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <Skeleton
                    width={'100%'}
                    height={'93px'}
                    wrapperStyle={{
                      display: 'block',
                      width: '100%',
                    }}
                  />
                </li>
                <li>
                  <p className="aside-monitoring-table__title">
                    <Skeleton
                      width={'100px'}
                      height={'17px'}
                      wrapperStyle={{
                        display: 'block',
                      }}
                    />
                  </p>
                  <div className="import-info__group">
                    <Skeleton
                      width={'100%'}
                      height={'250px'}
                      wrapperStyle={{
                        display: 'block',
                        width: '100%',
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div className="title-select__section">
                    <div className="title-select__header">
                      <p className="aside-monitoring-table__title">
                        <Skeleton
                          width={'100px'}
                          height={'21px'}
                          wrapperStyle={{
                            display: 'block',
                          }}
                        />
                      </p>
                    </div>
                    <div className="title-select__tags">
                      <div className="tags__section">
                        <ul className="tags__list">
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <li key={`loader-tag-${idx}`}>
                              <Skeleton
                                width={'62.55px'}
                                height={'20px'}
                                wrapperStyle={{
                                  display: 'block',
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
