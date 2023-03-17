import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doUpdate } from '../../redux/action/actionReducer'
import { toast } from 'react-toastify'

export default function EditUser(props) {
  let { users } = useSelector((state) => state.userReducers)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: users })

  const [data, setData] = useState({})

  const handleError = (errors) => {}

  const handleEdit = (data) => {
    dispatch(doUpdate({ id: props.isEdit.id, data }))
    toast.success()
    props.closeModal()
  }

  useEffect(() => {
    setData(users.filter((u) => u.id === props.isEdit.id)[0])
  }, [props.isEdit.id, users])

  const registerOptions = {
    username: { required: 'Username is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit User
                  </Dialog.Title>
                  <hr className="mt-2" />
                  <div className="mt-2">
                    {/* {errors?.serverError &&
                      errors.serverError.message.map((e) => (
                        <div className="bg-red-200 p-3">
                          <ul>
                            <li>{e}</li>
                          </ul>
                        </div>
                      ))} */}
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="mt-4">
                        <label>Username</label>
                        <input
                          name="username"
                          type="text"
                          defaultValue={data.username}
                          {...register('username', registerOptions.username)}
                          className={`rounded outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.username
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        />
                        <small className="text-red-600">
                          {errors?.username && errors.username.message}
                        </small>
                      </div>
                      <div className="mt-4">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          defaultValue={data.password}
                          {...register('password', registerOptions.password)}
                          className={`rounded outline-none border border-spacing-2 border-gray-400 block w-full px-3 py-2 mt-2 ${
                            errors?.password
                              ? 'active:border-red-700 focus:border-red-700 active:bg-red-200 focus:bg-red-200'
                              : 'active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200'
                          }`}
                        />
                        <small className="text-red-600">
                          {errors?.password && errors.password.message}
                        </small>
                      </div>

                      <div className="flex-row space-x-4 mt-4 text-rigt">
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                          Submit
                        </button>

                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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
