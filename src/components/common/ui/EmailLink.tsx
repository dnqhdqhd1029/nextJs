interface Props {
  email: string
}

const EmailLink = ({ email }: Props) => {
  return (
    <a
      href={`mailto:${email}`}
      target="_blank"
      rel="noopener noreferrer"
      className="button-link-text colors-body-link "
    >
      <span className="button__label button-link-text__label size-m">{email}</span>
    </a>
  )
}

export default EmailLink
