/**
 * HtmlElement를 받아서 모든 부모 엘리먼트를 반환합니다.
 * @param {HTMLElement} node
 * @returns {HTMLElement[]}
 */
export const getParentElements = (node: HTMLElement | null): HTMLElement[] => {
  const list: HTMLElement[] = []
  let current = node

  while (current?.parentNode && current.parentNode !== document.documentElement) {
    // parentNode는 Node 타입이지만, 우리는 HTMLElement 타입을 원하기 때문에 타입을 강제로 변환합니다.
    const parentElement = current.parentNode as HTMLElement
    list.push(parentElement)
    current = parentElement
  }

  return list
}
