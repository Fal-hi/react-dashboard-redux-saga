import React from 'react'

export default function Header(props) {
  const { title, ...others } = props
  return (
    <>
      <div className="flex items-baseline col-1 relative mt-4 bg-white shadow-xs border-b border-gray-200 px-4 pb-4 sm:py-4 sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2lg font-semibold leading-6 text-gray-900 sm:truncate uppercase">
            {title}
          </h1>
        </div>

        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            onClick={() => others.onClick()}
            type="buttom"
            className="border-2 border-black px-4 py-2 font-semibold sm:order-1 hover:scale-90 hover:bg-black hover:text-white"
          >
            ADD
          </button>
        </div>
      </div>
    </>
  )
}
