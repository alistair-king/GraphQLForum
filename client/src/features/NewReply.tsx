import React from 'react'
import FroalaEditor from 'react-froala-wysiwyg'

export const NewReply: React.FC = () => (
  <>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <FroalaEditor tag='textarea' config={{ theme: 'gray', placeHolder: 'test' }} id="grid-reply" defaultValue="" />
      </div>
    </div>
  </>
)