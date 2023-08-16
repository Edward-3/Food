import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContextProvider'
import Carts from './Carts'

const Products = () => {

    const {state:{productsList}}=useStateContext()
    const [products,setProducts]=useState([])
    // console.log(productsList);

    useEffect(()=>{
        setProducts(productsList)
        // console.log(products);
    },[productsList])


  return (
    <div className=' flex flex-wrap gap-7 justify-center'>
        {products?.map(products=> <Carts key={products.id} items={products}/>)}
    </div>
  )
}

export default Products