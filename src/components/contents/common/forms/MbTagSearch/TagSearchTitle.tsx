/**
 * @file TagSearchTitle.tsx
 * @description Tag search title
 */

import { useContext } from 'react'

import { TagSearchContext } from './TagSearchContainer'

import FormTitle from '~/components/common/ui/FormTitle'

interface Props {
  required?: boolean
}

const TagSearchTitle = ({ required = false }: Props) => {
  const { title, hasTooltip, tooltipNode } = useContext(TagSearchContext)

  return (
    <FormTitle
      title={title}
      tooltip={hasTooltip}
      required={required}
    >
      {tooltipNode}
    </FormTitle>
  )
}

export default TagSearchTitle
