import React from 'react'
import FroalaEditor from 'react-froala-wysiwyg'

export const NewPost: React.FC = () => (
  <>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-title">
          Title
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-title" />
      </div>
    </div>

    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-post">
          Post
        </label>
        <FroalaEditor tag='textarea' config={{ theme: 'gray', placeHolder: 'test' }} />
      </div>
    </div>

  </>
)

