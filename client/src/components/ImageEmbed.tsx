import React from 'react'

import { ImageViewer } from './ImageViewer'

import { useModal } from '../hooks'

export const ImageEmbed: React.FC<{
  image: string,
  title: string
}> = ({
  image,
  title
}) => {

  const { isOpen, openModal, closeModal } = useModal()
  
  return (
    <div className="flex justify-center">
      <ImageViewer title={title} isOpen={isOpen} closeModal={closeModal} image={image}>
        <img className="w-1/2 border border-solid border-gray-400 shadow p-1" onClick={openModal} src={image} alt="" />
      </ImageViewer>
    </div>
  )
}
