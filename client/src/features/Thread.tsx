import React from 'react'

export const Thread: React.FC = () => (
  <>
    <header className="bg-white shadow ">
      <div className="max-w-7xl mx-auto pb-6 pt-24 px-4 sm:px-6 lg:px-8 flex">
        <h1 className="w-3/4 text-3xl font-bold leading-tight text-gray-900">12,000km for the Heart Foundation</h1>
        <span className="w-1/4 text-right"><Commands /></span>
      </div>
    </header>

    <main className="bg-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">

                <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Heading
                </div>
                
                <div className="bg-white flex">
                  <div className="py-2 px-6">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
                
                <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">                
                  Footer
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </>
)

export const Commands: React.FC = () => (
  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Reply
  </button>
)

