import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Layout from './shared/Layout'
import Home from './pages/Home'
import User from './pages/User'
import Product from './pages/Product'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
