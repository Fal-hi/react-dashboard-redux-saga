import React from 'react'
import {BsPencil, BsEraser} from 'react-icons/bs'

export default function ProductCard(props) {
  const { data } = props

  return (
    <div className="h-group mb-0 sm:mb-4">
      <div className="min-h-auto rounded aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 transition-transform ease-in-out duration-500  lg:aspect-none lg:h-auto mt-3">
        <img
          src={data.image}
          alt={data.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className='flex justify-between items-baseline'>
        <div>
          <h6 className="text-xs text-gray-700 font-medium">
            {data.name.toUpperCase()}
          </h6>
          <p className="mt-1 text-[8px] lg:text-xs text-gray-500">
            {data.description.toUpperCase()}{' '}
          </p>
        </div>
        <div className='priceandbutton'>
          <div className='mb-0 sm:mb-1'>
            <h6 className="mt-3 text-xs sm:text-xs text-right font-medium text-gray-900">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              }).format(data.price)}
            </h6>
          </div>
          <div className='mt-[-4px] lg:mt-0 text-right'>
            <button
              type="button"
              className="px-1 sm:px-1 py-1 mr-1 sm:mr-2 border-2 border-black rounded-sm bg-white text-black text-[6px] lg:text-[10px] font-medium hover:bg-black hover:text-white transition-colors ease-out duration-500"
              onClick={() =>
                props.setIsEdit((prev) => {
                  return { ...prev, status: true, id: data.id }
                })
              }
            >
              <BsPencil/>
            </button>
            <button
            type='button'
              className="px-1 sm:px-1 py-1 border-2 border-black rounded-sm bg-white text-black text-[6px] lg:text-[10px] font-medium hover:bg-black hover:text-white transition-colors ease-out duration-500"
              onClick={() =>
                props.setIsDelete((prev) => {
                  return { ...prev, status: true, id: data.id }
                })
              }
            >
              <BsEraser/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
