import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const AddCart = () => {
  const [popup, setPopup] = useState(false);
  const [buyPopup, setBuyPopup] = useState(false);
  const [qty, setQty] = useState(0);
  const {
    state: { cartList },
    dispatch,
    state,
  } = useStateContext();
  console.log(cartList);
  const nav = useNavigate();

  useEffect(() => {
    if (cartList?.length <= 0) {
      nav("/");
    }
  }, [cartList]);

  useEffect(() => {
    let qy = 0;
    cartList.map((pd) => (qy = qy + pd?.qty));
    setQty(qy);
    console.log(qy);
  }, [cartList]);

  return (
    <div className=" pe-5 grid grid-cols-5 gap-4">
      <div className=" ms-5 col-span-4">
        {cartList?.map((pd) => (
          <div
            className=" flex items-center border border-black rounded-lg p-3 mb-3"
            key={pd.id}
          >
            <div>
              <div className=" flex border-2 border-black rounded">
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE_CART", payload: pd })
                  }
                  className=" border-e-2 border-black px-2 font-bold"
                >
                  -
                </button>
                <div className=" px-2 font-semibold">{pd?.qty}</div>
                <button
                  onClick={() =>
                    dispatch({ type: "INCREASE_CART", payload: pd })
                  }
                  className=" border-s-2 border-black px-2 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className=" flex">
              <div>
                <img className=" h-28 w-28 mx-4" src={pd.image} alt="" />
              </div>
              <div className=" w-[800px]">
                <h1 className=" font-bold">{pd?.title}</h1>
                <p className=" break-words">{pd?.description.substr(0, 150)}</p>
                <p className=" font-semibold">$ {pd?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" col-span-1">
        <div className=" bg-info py-6 rounded-lg">
          <div className=" flex justify-center ">
            <h1 className=" mb-4 font-bold text-2xl">Total Costs</h1>
          </div>
          <div className=" flex justify-center">
            <p className=" font-semibold text-xl mb-4">
              {qty} items for{" "}
              {cartList.reduce((a, p) => a + p.price * p.qty, 0).toFixed(2)} $
            </p>
          </div>
          <div className=" flex justify-center gap-4">
            <button
              className=" border border-red-500 rounded-lg bg-red-500 text-white px-3 py-1"
              onClick={() => setPopup(true)}
            >
              Delete All
            </button>
            <button
              className=" border border-green-500 rounded-lg bg-green-500 text-white px-3 py-1"
              onClick={() => setBuyPopup(true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Popup trigger={popup} btnPopup={setPopup}>
        <div className=" ">
          <h1 className=" text-3xl font-semibold mb-16">
            Are you sure to delete this!
          </h1>
        </div>
        <div className="">
          <button
            onClick={() => setPopup(false)}
            className=" me-16 border border-green-500 bg-green-500 text-white px-8 py-1 text-2xl rounded-lg"
          >
            No
          </button>
          <button
            onClick={() => dispatch({ type: "DELETE_CART" })}
            className=" border border-red-500 bg-red-500 text-white px-8 py-1 text-2xl rounded-lg"
          >
            Yes
          </button>
        </div>
      </Popup>
      <Popup trigger={buyPopup} btnPopup={setBuyPopup}>
        <div className=" mb-10">
            <h1 className=" text-2xl font-bold">Your order have been palced.</h1>
        </div>
        <div className=" mt-10">
            <button onClick={()=>setBuyPopup(false)} className="  me-16 border border-red-500 bg-red-500 text-white px-8 py-1 text-2xl rounded-lg">Cancel</button>
            <button onClick={()=>console.log(cartList.reduce((a, p) => a + p.price * p.qty, 0).toFixed(2))} className=" border border-green-500 bg-green-500 text-white px-8 py-1 text-2xl rounded-lg">Buy</button>
        </div>
      </Popup>
    </div>
  );
};

export default AddCart;
