import React from 'react'
import { useStateContext } from '../context/StateContextProvider'

const Popup = (props) => {
    const {dispatch}=useStateContext()
  return (props.trigger)?(
        <div>
            <div className=' fixed top-0 bottom-0 w-[100%] h-[100%] flex justify-center items-center bg-white opacity-50'></div>
            <div className=' fixed top-0 bottom-0 w-[100%] h-[100%] flex justify-center items-center'>
                <div className=' bg-gray-400 rounded-lg relative w-[500px] h-60 flex flex-col justify-center items-center '>
                    <button onClick={()=>props.btnPopup(false)} className=' absolute top-1 end-1 text-2xl font-semibold border border-white shadow-lg shadow-slate-600 bg-white px-4 py-0 rounded-lg'>
                        x
                    </button>
                    {props.children}
                </div>
            </div>

        </div>
  ):''
}

export default Popup