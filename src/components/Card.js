import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  let [qty, setQty] = useState(1);
  let [size, setSize] = useState("");
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={props.foodItem.img}
            alt="Card image cap"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-center fs-4">
              {props.foodItem.name}
            </h5>
            <div className="container text-center w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="m-2 h-100 bg-success rounded "
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.length > 0 ? (
                  priceOptions.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))
                ) : (
                  <option disabled>No options available</option>
                )}
              </select>
              <div className="h-100 fs-5 fw-bolder">₹{finalPrice}</div>
            </div>
            <hr />
            <div className="d-flex justify-content-center mt-2">
              <button
                className="btn btn-success w-100 fw-bold text-secondary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
