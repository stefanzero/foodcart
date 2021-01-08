import React, { forwardRef, useContext } from 'react';
import {store} from "../context/store";

export default forwardRef((props, ref) => {

  const { hide } = props;
  const hideClass = hide === false ? '' : 'hide';

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
  const containerClass = `quantity-container ${hideClass}`;

  return (
    <div className={containerClass} ref={ref} tabIndex="0" data-product_id={item.product_id}>
      <button className="minus" onClick={() => addToCart(-1)}>{minusContent}</button>
      <div className="quantity">{quantity}</div>
      <button className="plus" onClick={() => addToCart(1)}>+</button>
    </div>
  )
})
