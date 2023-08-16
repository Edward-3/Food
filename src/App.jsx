import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './products/Products'
import Nav from './nav/Nav'
import Details from './products/Details'
import AddCart from './products/AddCart'
import Success from './products/Success'

const App = () => {
  
  return (
    <div className=''>
      <Nav/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/detail/:id' element={<Details/>} />
        <Route path='/addcart' element={<AddCart/>} />
        <Route path='/success' element={<Success/>}/>
      </Routes>
    </div>
  )
}

export default App