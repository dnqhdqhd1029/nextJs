import cn from 'classnames'

import { defaultSteps } from '~/components/contents/distribution/Release/Press/defaultData'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const Steps = () => {
  const { tab } = usePressRelese()
  return (
    <div className="steps__group">
      <ul className="steps__list">
        {defaultSteps.map((item, index) => (
          <li
            key={item.id}
            className={cn({ 'is-active': tab.id === item.id })}
          >
            <p className="steps__text">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Steps
