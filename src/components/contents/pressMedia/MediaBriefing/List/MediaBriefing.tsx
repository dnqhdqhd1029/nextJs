import Content from '~/components/contents/pressMedia/MediaBriefing/List/Content/Content'
import Footer from '~/components/contents/pressMedia/MediaBriefing/List/Footer/Footer'
import Header from '~/components/contents/pressMedia/MediaBriefing/List/Header/Header'

const MediaBriefing = () => {
  return (
    <div className="mb-container responsive-type1 bg-body type-pb24">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MediaBriefing
