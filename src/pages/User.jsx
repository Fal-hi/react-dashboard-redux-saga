import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { doDelete, doRequestGetUser } from '../redux/action/actionReducer'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import AddUser from './user/AddUser'
import EditUser from './user/EditUser'
import DeleteUser from './user/DeleteUser'

const columns = [{ name: 'No' }, { name: 'Username' }, { name: 'Action' }]

export default function User() {
  let { users, message, refresh } = useSelector((state) => state.userReducers)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  })
  const [isDelete, setIsDelete] = useState(false)

  const editOpen = (id) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id }
    })
  }

  const deleteOpen = (id) => {
    dispatch(doDelete(id))
  }

  useEffect(() => {
    dispatch(doRequestGetUser())
    if (message) toast.success(message)
  }, [dispatch, message, refresh])

  return (
    <>
      <div>
        <Header title="User" onClick={() => setIsOpen(true)} />
        <table className="w-full md:w-8/12 lg:w-1/4 mt-8">
          <thead>
            <tr>
              {(columns || []).map((col, index) => (
                <th
                  key={index}
                  className="pr-6 pl-2 py-2 bg-black tracking-wider text-left"
                >
                  <span className="lg:pl-2 text-xs font-medium text-white uppercase">
                    {col.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {(users || []).map((d, index) => (
              <tr key={d.id}>
                <td className="pl-3 text-base font-semibold text-gray-900">
                  {index + 1}
                </td>
                <td className="pl-3 text-sm text-gray-900">{d.username}</td>
                <td className="px-3 text-sm text-gray-900">
                  <div className="w-full text-right">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-mdpx-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <BiDotsVerticalRounded
                            className="h-5 w-5 text-gray-500 hover:text-gray-900"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  onClick={() => editOpen(d.id)}
                                >
                                  {active ? (
                                    <MdEdit
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MdEdit
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  onClick={() => deleteOpen(d.id)}
                                >
                                  {active ? (
                                    <MdDelete
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MdDelete
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ToastContainer autoClose={5000} />

        {isOpen ? (
          <AddUser isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        ) : null}

        {isEdit.status ? (
          <EditUser
            isEdit={isEdit}
            closeModal={() =>
              setIsEdit((prev) => {
                return { ...prev, status: false }
              })
            }
          />
        ) : null}

        {isDelete.status ? (
          <DeleteUser
            isDelete={isDelete}
            closeModal={() =>
              setIsDelete((prev) => {
                return { ...prev, status: false }
              })
            }
          />
        ) : null}
      </div>
    </>
  )
}
