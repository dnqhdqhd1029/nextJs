import cn from 'classnames'

import { defaultSteps } from '~/components/contents/distribution/NewswireRelease/defaultData'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const Steps = () => {
  const { tab } = useNewswireRelease()
  console.log(tab)

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
