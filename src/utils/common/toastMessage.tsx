import { ReactNode } from 'react'

export const createMessageBox = (title: string, message: ReactNode | JSX.Element) => {
  return (
    <>
      <div className="toast-body__group">
        <h2 className="toast-body__title">{title}</h2>
        <p className="toast-body__text">{message}</p>
      </div>
    </>
  )
}
