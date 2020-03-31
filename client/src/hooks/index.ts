import { useCallback, useEffect, useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = (): void => setIsOpen(true)
  const closeModal = (): void => setIsOpen(false)
  return {
    isOpen,
    openModal,
    closeModal
  }
}

export const useCloseModalOnBack = ({
  isOpen,
  closeModal
}: {
  isOpen: boolean,
  closeModal: () => void
}): void => {
  const handleModal = useCallback(() => {
    if (isOpen) {
      closeModal()
    }
  }, [isOpen, closeModal])

  useEffect(() => {
    window.addEventListener('popstate', handleModal)
    return () => {
      window.removeEventListener('popstate', handleModal)
    }
  }, [handleModal])
}

