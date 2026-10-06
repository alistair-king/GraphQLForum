import React from 'react'

import { Button } from './Button'

/** Submit + Cancel button row for modal forms. */
export const ModalActions: React.FC<{
  closeModal: () => void,
  submitLabel: string
}> = ({
  closeModal,
  submitLabel
}) => (
  <>
    <Button type="submit">{submitLabel}</Button>
    <Button secondary onClick={closeModal}>Cancel</Button>
  </>
)
