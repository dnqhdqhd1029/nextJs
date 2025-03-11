import { useRouter } from 'next/router'

import { setObjectToBase64 } from '~/utils/common/object'

export const useRouterParameterChange = <T, U = {}>() => {
  const router = useRouter()
  const handleRouterParameterChange = (params: T, replace = false, additionalQueries?: U) => {
    const allQueries = { ...params }
    const queryString = setObjectToBase64(allQueries as object) ?? ''

    if (replace) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            q: queryString,
            ...additionalQueries,
          },
        },
        undefined,
        {
          shallow: true,
        }
      )
      return
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: {
            q: queryString,
            ...additionalQueries,
          },
        },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  return {
    handleRouterParameterChange,
  }
}
