import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../api'
import {FaList,FaStarHalfAlt,FaCartPlus} from 'react-icons/fa'
import { useStateContext } from '../context/StateContextProvider'

const Details = () => {

    const {id}=useParams()
    const [product,setProduct]=useState({})
    const [cat,setCat]=useState([])
    const {dispatch}=useStateContext()
    
    const getDetail=async()=>{
        const data=await getData(`/products/${id}`)
        setProduct(data)
    }

    const getCat=async()=>{
        const data=await getData(`/products/category/${product.category}`)
        setCat(data)
    }
    
    useEffect(()=>{
        getDetail()
    },[cat,setCat])

    useEffect(()=>{
        getCat()
    },[product])
    
    console.log(cat);

  return (
    <>
    <div className=' flex flex-row justify-center'>
        <div className=' flex justify-center gap-5  bg-gradient-to-t to-slate-600 from-white p-6 border-2 rounded-xl'>
            <div className=' h-60 w-56 rounded-lg bg-white mt-7'>
                <img src={product?.image} className=' mx-auto h-56 rounded-lg' alt="" />
            </div>
            <div className=' w-[400px] flex flex-col'>
                <div className=' w-32 ps-2 ms-auto rounded-full mb-3 bg-red-500'>
                    <h2 className=' text-white py-[1px]'>{product.category}</h2>
                </div>
                <h1 className=' text-xl mb-3 font-semibold'>{product?.title}</h1>
                <p className=' text-gray-700 leading-6 tracking-wider'>{product?.description}</p>
                <div className=' flex justify-between my-3'>
                    <h3 className=' font-semibold my-2'>Price : {product?.price} $</h3>
                    <div className=' flex items-center'>
                        <FaStarHalfAlt className=' mr-1 text-yellow-700'/>
                        {product?.rating?.rate}({product?.rating?.count})
                    </div>
                </div>
                <div className=' mt-3 ms-auto'>
                    <button onClick={()=>dispatch({type:"ADD_TO_CART",payload:product})} className=' w-28 rounded-full text-zinc-300 h-7 shadow-lg shadow-gray-700 bg-blue-500 mr-3'>Add to Cart</button>
                    <button className=' w-28 rounded-full text-zinc-300 h-7 shadow-lg shadow-gray-700 bg-black'>Buy Now</button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h1 className=' font-semibold text-xl mt-2 ms-12'>Simular Items</h1>
        <div className=' flex gap-5'>
            {cat.map(cat=> 
                {if(cat.id!=product.id){
                    return (
                        <Link to={`/detail/${cat?.id}`}>
                            <div className=' border-2 p-2 pb-0 w-44 rounded-xl'>
                                <img className=' h-44 w-44 rounded-xl' src={cat?.image} alt="" />
                                <h2 className=' text-normal font-semibold'>{cat?.title.substr(0,20)}...</h2>  
                                <p className=' text-xl ms-1'>{cat?.price} $</p>
                            </div>
                        </Link>
                    )
                }})}
        </div>
    </div>
    </>
  )
}

export default Details