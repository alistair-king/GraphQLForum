import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import { MdCloudDownload, MdClose } from 'react-icons/md'

import { ActionButton } from './ActionButton'

import { useCloseModalOnBack, useKeyboardEvent } from '../hooks'

export const ImageViewer: React.FC<{
  isOpen: boolean,
  closeModal: () => void,
  children: ReactNode,
  title: string,
  image: string,
}> = ({
  isOpen,
  closeModal,
  children,
  title,
  image
}) => {
  
  useCloseModalOnBack({ isOpen, closeModal })
  useKeyboardEvent('Escape', closeModal)

  const afterOpen = (): void => {
  	document.body.style.overflow = 'hidden'
  }

  const afterClose = (): void => {
  	document.body.style.overflow = 'auto'
  }
  
  return (
    <>
      {children}
      <ReactModal
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(204, 204, 204, 0.75)',
            zIndex: 40
          },
          content: {
            backgroundColor: 'black',
            border: 'none',
            bottom: 'auto',
            height: '100%',
            left: '50%',
            padding: 0,
            position: 'fixed',
            right: 'auto',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%'
          }
        }}
        shouldCloseOnEsc
        onRequestClose={closeModal}
        onAfterOpen={afterOpen}
        onAfterClose={afterClose}
      >
        <Content title={title} image={image} closeModal={closeModal} />
      </ReactModal>
    </>
  )
}

const Content: React.FC<{
  title: string,
  image: string,
  closeModal: () => void 
}> = ({
  title,
  image, 
  closeModal
}) => (
  <div className="h-full">
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 border-b border-gray-700 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <ActionButton dark tooltip="Close" className="mr-6" onClick={() => closeModal()}><MdClose /></ActionButton>  
        {title || image}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-3" onClick={() => closeModal()}>
          <img src={image} alt="" className="max-h-85-vh" />
      </div>

      <div className="pin-b flex justify-end px-6 py-3 border-t border-gray-700 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <ActionButton dark tooltip="Download"><MdCloudDownload /></ActionButton>  
      </div>
    </div>
  </div>
)