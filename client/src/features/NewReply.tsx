import React from 'react'

export const NewReply: React.FC = () => (
  <>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <textarea
          autoFocus
          name="content"
          id="grid-reply"
        />
      </div>
    </div>
  </>
)