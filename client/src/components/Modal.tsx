import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

import { useCloseModalOnBack } from '../hooks'

export const Modal: React.FC<{
  isOpen: boolean,
  closeModal: () => void,
  children: ReactNode,
  title: string,
  content: ReactNode,
  actions?: ReactNode
}> = ({
  isOpen,
  closeModal,
  children,
  title,
  content,
  actions
}) => {
  
  useCloseModalOnBack({ isOpen, closeModal })
  
  return (
    <>
      {children}
      <ReactModal
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(204, 204, 204, 0.75)'
          },
          content: {
            border: '1px solid #ccc',
            borderRadius: '4px',
            bottom: 'auto',
            minHeight: '10rem',
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
      >
        <Content title={title} actions={actions}>
          {content}
        </Content>
      </ReactModal>
    </>
  )
}

const Content: React.FC<{
  children: ReactNode,
  title: string,
  actions?: ReactNode
}> = ({
  children,
  title,
  actions
}) => (
  <>
    <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </div>

    <div className="px-6 py-3 overflow-y-auto" style={{maxHeight: '80vh'}}>
      {children}
    </div>

    {actions &&
      <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {actions}
      </div>
    }
  </>
)