import React from 'react'

export const NewReply: React.FC = () => (
  <>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <textarea className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-post" disabled>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.q
        </textarea>
      </div>
    </div>

    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-reply">
          Post
        </label>
        <textarea className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-reply" />
      </div>
    </div>

  </>
)