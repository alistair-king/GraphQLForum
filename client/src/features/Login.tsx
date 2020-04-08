import React from 'react'

export const Login: React.FC = () => (
  <>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-email">
          Email
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:bg-red-700s" id="grid-email" />
      </div>
    </div>

    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
          Password
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:bg-red-700s" id="grid-password" type="password" />
      </div>
    </div>

  </>
)

