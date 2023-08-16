import React from 'react'
import { FaCartPlus, FaList, FaListAlt, FaShopify, FaStarHalfAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContextProvider';

const Carts = ({items}) => {

  // console.log(items);

    const {title,id,image,price,description,category,rating:{count,rate}}=items;
    const {dispatch}=useStateContext()

  return (
    <div className=' w-56 h-[342px] rounded-lg p-6 border-2 bg-gradient-to-t from-white to-gray-600'> 
      <div className=' flex justify-center mb-4 rounded-xl bg-white'>
        <img src={image} className=' h-40 bg-info' alt="" />
      </div>
        <h2 className=' font-semibold my-4'>{title.substr(0,16)}...</h2>
      <div className=''>{description.substr(0,20)}<span className=' ms-2 text-gray-500'>See More...</span></div>
      <div className=' my-4 flex justify-between items-center'>
        <div className=' flex items-center gap-1'>
          <FaStarHalfAlt className=' text-yellow-600'/>
          {rate}
        </div>
        <div className=' flex items-center gap-1'>
          <Link to={`/detail/${items.id}`}>
            <button className=' border-2 border-gray-700 bg-info'>
              <FaList className=' m-1'/>
            </button>
          </Link>
            <button onClick={()=>dispatch({type:"ADD_TO_CART",payload:items})} className=' border-2 border-gray-700 bg-secondary'>
              <FaCartPlus className=' m-1 text-white'/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Carts