import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

import { useCloseModalOnBack, useKeyboardEvent } from '../hooks'

export const Modal: React.FC<{
  isOpen: boolean,
  closeModal: () => void,
  children: ReactNode,
  onSubmit?: (data: any) => void,
  content: ReactNode,
}> = ({
  isOpen,
  closeModal,
  children,
  content,
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
            border: '1px solid #ccc',
            borderRadius: '4px',
            bottom: 'auto',
            left: '50%',
            padding: 0,
            position: 'fixed',
            right: 'auto',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '20rem',
            width: '80%',
            maxWidth: '60rem'
          }
        }}
        shouldCloseOnEsc
        onRequestClose={closeModal}
        onAfterOpen={afterOpen}
        onAfterClose={afterClose}
      >
        {content}
      </ReactModal>
    </>
  )
}
