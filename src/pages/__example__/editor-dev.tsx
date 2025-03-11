import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('~/components/example/CkEditorDev'), { ssr: false })

const CkEditorExample = () => {
  return <Editor />
}

export default CkEditorExample
CkEditorExample.Layout = 'LAYOUT4'
