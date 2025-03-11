import Link from 'next/link'

import UploadFileByDrop from '~/components/common/ui/UploadFileByDrop'
import UploadFileByInput from '~/components/common/ui/UploadFileByInput'
import { PageType } from '~/types/common'

const About: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Dropzone Page</h1>

        <code className="guide__code">
          1. 문서&nbsp;:&nbsp;
          <Link
            href="https://www.files-ui.com/getting-started"
            legacyBehavior
          >
            <a target="_blank">https://www.files-ui.com/getting-started</a>
          </Link>
          <br />
          2. 에러 시 file-uploader__list &gt; li : file-status-error 클래스추가
          <br />
          3. 파일별 삭제 아이콘 변경으로 작동 안됨. 현재 디자인 대로 아이콘 변경 및 기능 요청.
          <br />
          4. 파일별 삭제 아이콘 =&gt; 디폴트 : 노출X / 마우스 오버 : 노출 O
        </code>

        <h2 className="guide__title">Upload files by dropping</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <UploadFileByDrop />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Upload files by input[type=file]</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <UploadFileByInput />
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default About
About.Layout = 'BLANK'
