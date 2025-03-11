/**
 * @file
 * @description
 */

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NextImage from 'next/image'

import LoadingIcon from '~/components/common/ui/LoadingIcon'

const Image = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const handleImageLoaded = () => {
    setIsLoaded(true)
  }
  return (
    <span className={'next-image__wrapper'}>
      <NextImage
        {...props}
        onLoad={handleImageLoaded}
        style={{
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      />
      <AnimatePresence>
        {!isLoaded && (
          <motion.span
            className={'next-image__loader'}
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            exit={{ display: 'none' }}
            transition={{ duration: 0.15 }}
          >
            <span className="next-image__loader-container">
              <LoadingIcon />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default Image
