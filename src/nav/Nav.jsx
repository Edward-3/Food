import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaCartPlus, FaSearch, FaShopify} from 'react-icons/fa'
import { useStateContext } from '../context/StateContextProvider'

const Nav = () => {

    // const img=""

    const {search,setSearch}=useStateContext()
    const {state:{cartList}}=useStateContext()

  return (
    <div className=' flex mx-6 justify-between h-11 items-center mb-4'>
        <Link to="/" className=' flex items-center'>
            <FaShopify className=' text-4xl'/>
            <h1 className=' font-roboto font-bold text-xl'>Amanzon</h1>
        </Link>
        <div className=' flex items-center gap-6'>
            <div className=' flex border bg-white rounded-full mt-2 px-2 items-center gap-1'>
                <FaSearch/>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} className=' outline-none w-40' placeholder='Search...' />
            </div>
            <div className=''>
                <Link to={`/addcart`}>
                    <FaCartPlus className=' text-2xl text-gray-700 absolute'/>
                    <div className=' w-4 h-4 flex items-center rounded-full relative left-4 bottom-2 bg-red-500'> 
                        <small className=' text-white mx-auto'>{cartList.reduce((a,p)=> a+p.qty,0)}</small>
                    </div>
                </Link>
            </div>
            <div className=' ms-2'>
                <div>
                    <img className=' h-10 w-10 rounded-full' src="../public/aiony-haust-3TLl_97HNJo-unsplash.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav