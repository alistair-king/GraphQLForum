import React, { ReactNode, useEffect, useRef } from 'react'

import { useCloseModalOnBack } from '../hooks'

/**
 * Modal built on the native <dialog> element: Escape and backdrop clicks
 * close it, focus is trapped by the browser.
 */
export const Modal: React.FC<{
  isOpen: boolean,
  closeModal: () => void,
  children: ReactNode,
  content: ReactNode,
}> = ({
  isOpen,
  closeModal,
  children,
  content,
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 border border-gray-300 rounded min-w-80 w-4/5 max-w-3xl text-left backdrop:bg-gray-400/75"
      >
        {/* mount content only while open: forms and the editor start
            fresh on every open instead of keeping the previous draft */}
        {isOpen && content}
      </dialog>
    </>
  )
}
