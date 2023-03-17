import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doAdd } from '../../redux/action/actionReducerProduct'
import { toast } from 'react-toastify'

export default function AddProduct(props) {
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const { productCategory } = useSelector((state) => state.productReducers)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  function onSubmit(dt) {
    console.log(dt)
  }

  const handleError = (errors) => {}

  const handleRegistration = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('category_id', data.category_id)
      formData.append('price', data.price)
      formData.append('image', data.image[0])
      dispatch(doAdd(formData))
      toast.success()
      props.closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const registerOptions = {
    name: { required: 'Username is required' },
    description: { required: 'Description is required' },
    category_id: { required: 'Category_id is required' },
    price: { required: 'Price is required' },
  }

  const onChangeImage = (e) => {
    setSelectedImage(e.target.files[0])
  }

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Add Product
                  </Dialog.Title>
                  <hr className="mt-2" />

                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit(
                        handleRegistration,
                        handleError,
                        onSubmit,
                      )}
                      encType="multipart/form-data"
                    >
                      {selectedImage && (
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt={selectedImage.name}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                      )}
                      <div className="mt-4">
                        <label className="font-medium text-gray-600">
                          Product Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          {...register('name', registerOptions.name)}
                          className={`outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.name
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        />
                        <small className="text-red-600">
                          {errors?.name && errors.name.message}
                        </small>
                      </div>

                      <div className="mt-4">
                        <label className="font-medium text-gray-600">
                          Product Description
                        </label>
                        <input
                          name="description"
                          type="text"
                          {...register('description', registerOptions.name)}
                          className={`outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.name
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        />
                        <small className="text-red-600">
                          {errors?.description && errors.description.message}
                        </small>
                      </div>

                      <div className="mt-4">
                        <label className="font-medium text-gray-600">
                          Category Product
                        </label>
                        <select
                          name="category_id"
                          {...register(
                            'category_id',
                            registerOptions.category_id,
                          )}
                          className={`outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.category_id
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        >
                          {(productCategory || []).map((cat, i) => (
                            <option value={cat.id} key={i}>
                              {cat.name_category}
                            </option>
                          ))}
                        </select>
                        <small className="text-red-600">
                          {errors?.category_id && errors.category_id.message}
                        </small>
                      </div>

                      <div className="mt-4">
                        <label className="font-medium text-gray-600">
                          Price
                        </label>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              {...register('price', registerOptions.price)}
                              className={`outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                                field?.ref?.errors?.price
                                  ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                                  : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                              }`}
                              onChange={(e) => {
                                let value = e.target.value
                                value = value.replace(/\D/g, '') // hanya menerima digit saja
                                value = value.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  '.',
                                ) // menambahkan tanda titik sebagai pemisah ribuan
                                field.onChange(value)
                              }}
                            />
                          )}
                        />
                        <small className="text-red-600">
                          {errors?.price && errors.price.message}
                        </small>
                      </div>

                      <div className="mt-4">
                        <label className="font-medium text-gray-600">
                          Product Image
                        </label>
                        <label className="block mt-3">
                          <span className="sr-only">Choose Product Image</span>
                          <input
                            type="file"
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-300"
                            name="image"
                            onInput={onChangeImage}
                            {...register('image')}
                          />
                        </label>
                      </div>

                      <hr className="my-4" />

                      <div className="flex-row space-x-4 mt-4 text-rigt">
                        <button className="inline-flex justify-center  border-2 border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors ease-out duration-300  focus:outline-none focus-visible:ring-2">
                          Submit
                        </button>

                        <button
                          className="inline-flex justify-center border-2 border-red-700 text-red-900 hover:bg-red-800 hover:text-white px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 transition-colors ease-out duration-500"
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
