import Content from '~/components/contents/pressMedia/SearchResult/Press/MiddleContent/Content/Content'
import Footer from '~/components/contents/pressMedia/SearchResult/Press/MiddleContent/Footer/Footer'
import Header from '~/components/contents/pressMedia/SearchResult/Press/MiddleContent/Header/Header'

const PressMiddleContent = () => {
  return (
    <div className="mb-contents-layout__section">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default PressMiddleContent
