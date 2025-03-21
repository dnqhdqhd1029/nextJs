/**
 * @file ErrorBoundary.tsx
 * @description 에러 바운더리
 */

import { Component, ErrorInfo, ReactNode } from 'react'

/**
 * ErrorBoundaryProps
 */
interface Props {
  /**
   * 자식 요소 타입
   */
  children?: ReactNode
}

/**
 * ErrorBoundaryState
 */
interface State {
  /**
   * 에러 여부
   */
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  // 상태
  public state: State = {
    hasError: false,
  }

  /**
   * 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트
   * @param {Error} _ 에러
   * @returns {State} - 에러정보
   */
  public static getDerivedStateFromError(_: Error): State {
    console.log('getDerivedStateFromError: ', _)
    return { hasError: true }
  }

  /**
   * 에러가 발생하면 에러정보를 로그에 출력
   * @param {Error} error 에러
   * @param {ErrorInfo} errorInfo 에러정보
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
