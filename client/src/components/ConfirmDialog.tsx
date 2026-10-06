import React from 'react'

import { Button } from './Button'

/** "Are you sure?" confirmation body for destructive-action modals. */
export const ConfirmDialog: React.FC<{
  title: string,
  onDelete: () => void,
  closeModal: () => void
}> = ({
  title,
  onDelete,
  closeModal
}) => (
  <>
    <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </div>
    <div className="px-6 py-3">
      <div className="-mx-3 md:flex">
        <p>Are you sure?</p>
      </div>
    </div>
    <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
      <Button onClick={onDelete}>Delete</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </div>
  </>
)
