import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { doLogin } from '../redux/action/actionReducer';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { payload, message, login } = useSelector((state) => state.userReducers)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    dispatch(doLogin(data))
  }

  const loginOptions = {
    username: { required: 'Username is required' },
    password: { required: 'Password is required' },
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(login || token) navigate('/')
    if(message) toast.error(message)
  }, [navigate, login, message, payload])

  return (
    <div className='mt-28'>
      <header className='bg-white rounded mb-2 py-4 px-20 max-w-md mx-auto'>
        <h1 className='text-center text-bold tracking-wider'>LOGIN FORM</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white rounded py-10 px-20 max-w-md mx-auto'>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black font-normal mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username", loginOptions.username)}
              placeholder="Enter your username"
              className={`border-gray-300 text-black border-2 rounded p-2 w-full text-xs focus:outline-none ${
                errors?.name ?
                "active:border-rose-400 focus:border-rose-400 active:bg-rose-200 focus:bg-rose-200" :
                "active:border-sky-400 focus:border-sky-400 active:bg-sky-200 focus:bg-sky-200"
              }`}
            />
            <small className="text-rose-400 text-xs font-medium">
              {errors?.username && errors.username.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", loginOptions.password)}
              placeholder="Enter your password"
              className={`border-gray-300 text-black border-2 rounded p-2 w-full text-xs focus:outline-none ${
                errors?.name ?
                "active:border-rose-400 focus:border-rose-400 active:bg-rose-200 focus:bg-rose-200" :
                "active:border-sky-400 focus:border-sky-400 active:bg-sky-200 focus:bg-sky-200"
              }`}
            />
            <small className="text-rose-400 text-xs font-medium">
              {errors?.password && errors.password.message}
            </small>
          </div>
        </div>
        <footer className='bg-white mt-2 py-4 rounded text-center max-w-md mx-auto'>
          <button
            type="submit"
            className="border-2 border-black text-black text-xs tracking-wider font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-black hover:text-white "
          >
            LOGIN
          </button>
        </footer>
      </form>
      <ToastContainer autoClose={5000}/>
    </div>
  );
}

