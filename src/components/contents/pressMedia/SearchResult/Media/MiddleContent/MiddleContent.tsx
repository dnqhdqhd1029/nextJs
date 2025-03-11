import Content from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/Content/Content'
import Footer from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/Footer/Footer'
import Header from '~/components/contents/pressMedia/SearchResult/Media/MiddleContent/Header/Header'

const MediaMiddleContent = () => {
  return (
    <div className="mb-contents-layout__section">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default MediaMiddleContent
