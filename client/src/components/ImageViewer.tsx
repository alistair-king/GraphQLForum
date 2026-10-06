import React, { ReactNode, useEffect, useRef } from 'react'
import { MdCloudDownload, MdClose } from 'react-icons/md'

import { ActionButton } from './ActionButton'

import { useCloseModalOnBack } from '../hooks'

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
  const dialogRef = useRef<HTMLDialogElement>(null)

  useCloseModalOnBack({ isOpen, closeModal })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <>
      {children}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeModal()
          }
        }}
        className="fixed inset-0 m-0 p-0 h-full w-full max-w-none max-h-none border-0 bg-black text-left backdrop:bg-gray-400/75"
      >
        <Content title={title} image={image} closeModal={closeModal} />
      </dialog>
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

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-3" onClick={closeModal}>
          <img src={image} alt="" className="max-h-85-vh" />
      </div>

      <div className="flex justify-end px-6 py-3 border-t border-gray-700 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <ActionButton dark tooltip="Download"><MdCloudDownload /></ActionButton>
      </div>
    </div>
  </div>
)
