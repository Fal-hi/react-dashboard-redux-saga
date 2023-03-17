import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doUpdate } from '../../redux/action/actionReducerProduct'
import { toast } from 'react-toastify'

export default function EditProduct(props) {
  const [data, setData] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

  const { products, productCategory } = useSelector(
    (state) => state.productReducers,
  )
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ defaultValues: data })

  const handleError = (errors) => {}

  const handleEdit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('category_id', data.category_id)
      formData.append('price', data.price)
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      dispatch(doUpdate({ id: props.isEdit.id, data: formData }))
      toast.success()
      props.closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const product = products.find((product) => product.id === props.isEdit.id)
    setData(product)
    reset(product)
  }, [products, props.isEdit.id, reset])

  const registerOptions = {
    name: { required: 'Name is required' },
    description: { required: 'Description is required' },
    category_id: { required: 'Category is required' },
    price: { required: 'Price is required' },
  }

  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
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
                    Edit Product
                  </Dialog.Title>
                  <hr className="mt-2" />

                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit(handleEdit, handleError)}
                      encType="multipart/form-data"
                    >
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : data.image
                          }
                          alt={selectedImage ? selectedImage.name : data.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>

                      <div className="mt-4">
                        <label>Product Name</label>
                        <input
                          name="name"
                          type="text"
                          defaultValue={data.name}
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
                        <label>Product Description</label>
                        <input
                          name="description"
                          type="text"
                          defaultValue={data.description}
                          {...register(
                            'description',
                            registerOptions.description,
                          )}
                          className={`outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.description
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        />
                        <small className="text-red-600">
                          {errors?.description && errors.description.message}
                        </small>
                      </div>

                      <div className="mt-4">
                        <label>Category Product</label>
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
                          {productCategory.map((cat, i) => (
                            <option
                              value={cat.id}
                              key={i}
                              defaultValue={data.category_id}
                            >
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
                            onInput={(e) => setSelectedImage(e.target.files[0])}
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
