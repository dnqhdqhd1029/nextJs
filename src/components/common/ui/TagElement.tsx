import { createElement } from 'react'

//@ts-ignore
const TagElement = ({ tagName, children, ...props }) => createElement(tagName, props, children)

export default TagElement
