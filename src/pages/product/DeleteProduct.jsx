import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doDelete } from '../../redux/action/actionReducerProduct'

export default function DeleteProduct(props) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { products } = useSelector((state) => state.productReducers)

  const dispatch = useDispatch()

  const [data, setData] = useState({})

  const handleError = (errors) => {}

  const handleDelete = () => {
    dispatch(doDelete(props.isDelete.id))
    props.setIsDelete(false)
    // toast.warning()
  }

  useEffect(() => {
    if (products !== undefined) {
      const product = products.find(
        (product) => product.id === props.isDelete.id,
      )
      setData(product)
    }
  }, [products, props.isDelete.id])

  return (
    <div>
      <Transition appear show={props.isDelete.status} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Product
                  </Dialog.Title>

                  <hr className="mt-2" />
                  <p className="text-base my-2">
                    Apakah anda yakin untuk menghapus produk dengan{' '}
                    <span className="font-bold">id:</span> {data.id},{' '}
                    <span className="font-bold">Nama: </span> {data.name}{' '}
                  </p>
                  <div className="mt-2">
                    {/* {errors?.serverError &&
                      errors.serverError.message.map((e) => (
                        <div className="bg-red-200 p-3">
                          <ul>
                            <li>{e}</li>
                          </ul>
                        </div>
                      ))} */}
                    <form onSubmit={handleSubmit(handleDelete, handleError)}>
                      <div className="flex-row space-x-4 mt-4 text-rigt">
                        <button className="inline-flex justify-center border-2 border-red-700 text-red-900 hover:bg-red-800 hover:text-white px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 transition-colors ease-out duration-500">
                          Delete
                        </button>

                        <button
                          className="inline-flex justify-center  border-2 border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors ease-out duration-300  focus:outline-none focus-visible:ring-2"
                          onClick={props.closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
