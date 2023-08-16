import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { getData } from '../api'

const StateContext=createContext()

const StateContextProvider = ({children}) => {
    const [products,setProucts]=useState([])
    const [search,setSearch]=useState('')
    const [cart,setCart]=useState([])


    const initialState={
        productsList:[],
        cartList:[]
    }

    const reducer=(state,action)=>{
        switch (action.type){
            case "GET_PRODUCTS":
                return {...state,productsList:action.payload}
            case "ADD_TO_CART":
                const item=action.payload;
                const isExisted=state.cartList.find(pd=> pd.id===item.id)
                if(isExisted){
                    return {...state,cartList:state.cartList.map(pd=> pd.id===item.id ? {...item,qty:state.cartList.find(pd=> pd.id==item.id).qty+1}: {...pd})}
                }else{
                    return {...state,cartList:[...state.cartList,{...item,qty:1}]}
                }
            case "DELETE_CART":
                return {...state,cartList:state.cartList=[]}    
            case "INCREASE_CART":
                const cart=action.payload;
                const isExisted1=state.cartList.find(pd=>pd.id==cart.id)
                if(isExisted1){
                    return {...state,cartList:state.cartList.map(pd=>pd.id==cart.id ?{...cart,qty:state.cartList.find(pd=> pd.id==cart.id).qty+1}: {...pd})}
                }else{
                    return {...state,cartList:[...state.cartList]}
                }
            case "DECREASE_CART":
                const cart1=action.payload;
                const isExisted2=state.cartList.find(pd=>pd.id==cart1.id)
                if(cart1.qty==1){
                    return {...state,cartList:[...state.cartList.filter(pd=> pd.id!==cart1.id)]}
                }else if(isExisted2){
                    return {...state,cartList:state.cartList.map(pd=>pd.id==cart1.id ?{...cart1,qty:state.cartList.find(pd=> pd.id==cart1.id).qty-1}: {...pd})}
                }else{
                    return {...state,cartList:[...state.cartList]}
                }
            default:
                return state
        }
    }

    const [state,dispatch]=useReducer(reducer,initialState)

    const productUrl="/products"

    const getFetch=async()=>{
        const data=await getData(productUrl)
        // console.log(data);
        setProucts(data)
    }

    useEffect(()=>{
        getFetch()
    },[])

    useEffect(()=>{
        dispatch({type:"GET_PRODUCTS",payload:products})
        const filterProducts=products.filter(pd=> pd.title.toLowerCase().includes(search.toLowerCase()))
        dispatch({type:"GET_PRODUCTS",payload:filterProducts})
    },[products,search,setSearch])



    // console.log(search);
    const data={state,search,setSearch,dispatch,cart,setCart}

  return (
    <div className=''>
        <StateContext.Provider value={data}>
        {children}

        </StateContext.Provider>
    </div>
  )
}

export const useStateContext=()=>useContext(StateContext)
export default StateContextProvider