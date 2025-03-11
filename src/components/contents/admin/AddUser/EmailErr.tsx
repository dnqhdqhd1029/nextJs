export const EmailErr = (emailList: string[]) => {
  return (
    <>
      <p>이미 등록된 이메일이 있습니다.</p>
      <ul style={{ marginTop: '8px' }}>
        {emailList.map((email, index) => (
          <li key={`${email}${index}`}>{email}</li>
        ))}
      </ul>
    </>
  )
}
