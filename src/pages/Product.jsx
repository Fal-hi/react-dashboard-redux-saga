import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddProduct from './product/AddProduct'
import { doRequestGetProduct } from '../redux/action/actionReducerProduct'
import EditProduct from './product/EditProduct'
import DeleteProduct from './product/DeleteProduct'
import Header from '../components/Header'

export default function Product() {
  // useSelector mengambil dari store
  const { products, message, refresh } = useSelector(
    (state) => state.productReducers,
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isDelete, setIsDelete] = useState({
    status: false,
    id: 0,
  })
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  })

  useEffect(() => {
    dispatch(doRequestGetProduct())
    if (message) toast.success(message)
  }, [dispatch, refresh, message])

  return (
    <>
      <div className="sm:max-w-">
        <Header title="Product" onClick={() => setIsOpen(true)} />

        <div className="mt-6 lg:gap-8 columns-2 sm:columns-3 lg:columns-5">
          {(products || []).map((d, i) => (
            <ProductCard
              data={d}
              key={i}
              setIsDelete={setIsDelete}
              setIsEdit={setIsEdit}
            />
          ))}
        </div>
      </div>

      <ToastContainer autoClose={5000} />

      {isOpen ? (
        <AddProduct isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}

      {isEdit.status ? (
        <EditProduct
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}

      {isDelete.status ? (
        <DeleteProduct
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          closeModal={() =>
            setIsDelete((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
    </>
  )
}
