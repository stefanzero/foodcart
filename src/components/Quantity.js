import React, { forwardRef, useContext, useRef, useEffect } from 'react';
import {store} from "../context/store";

export default forwardRef((props, ref) => {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  const { item } = props;
  if (!item) {
    return null;
  }
  const { product_id } = item;
  let quantity = '';
  if ( cart.items[product_id] ) {
    quantity = cart.items[product_id];
  }

  const addToCart = (quantity) => {
    // console.log(`addToCart: ${product_id}`);
    dispatch({
      type: 'addToCart',
      payload: {
        product_id,
        quantity
      }
    })
  };

  // const minus = quantity > 1 ? '-' : (<span className="fa-trash"></span>)
  const minusContent = quantity > 1 ? '-' : (<img src="/images/trash.png" alt="trash"></img>);

  return (
    <div className="quantity-container hide" ref={ref} tabIndex="0">
      <button className="minus" onClick={() => addToCart(-1)}>{minusContent}</button>
      <div className="quantity">{quantity}</div>
      <button className="plus" onClick={() => addToCart(1)}>+</button>
    </div>
  )
})
