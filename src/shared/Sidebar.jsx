import { forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FLogo from '../assets/f.svg'

const SideBar = forwardRef(({ showNav }, ref) => {
  const { pathname } = useLocation()
  const listMenu = [
    { to: '/', path: '/', name: 'HOME' },
    { to: 'user', path: '/user', name: 'USER' },
    { to: 'product', path: '/product', name: 'PRODUCT' },
  ]

  return (
    <div ref={ref} className="fixed w-44 h-full bg-white shadow-sm z-10">
      <div className="flex justify-center mt-6 mb-8">
        <picture>
          <img className="w-14 h-auto" src={FLogo} alt="F Logo" />
        </picture>
      </div>

      <div className="flex-col">
        {(listMenu || []).map((list, i) => (
          <Link to={`${list.to}`} key={i}>
            <div
              className={`pl-6 py-3 mx-5 text-center cursor-pointer flex items-center transition-colors ${
                pathname === list.path
                  ? 'text-black font-semibold hover:font-semibold'
                  : 'text-gray-400'
              }`}
            >
              <p className="text-sm">{list.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

SideBar.displayName = 'SideBar'

export default SideBar
