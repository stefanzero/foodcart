import React, { useContext, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { store } from '../context/store';
import Quantity from './Quantity';

export default function Item({item}) {
  const location = useLocation();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  const addToCart = (quantity) => {
    // console.log(`addToCart: ${product_id}`);
    if (cartQuantity && quantityRef.current) {
      quantityRef.current.classList.remove('hide');
      return;
    }
    dispatch({
      type: 'addToCart',
      payload: {
        product_id,
        quantity: 1
      }
    })
  };

  /*
  const quantityRef = {
    container: null,
    minus: null,
    quantity: null,
    plus: null
  };
  */
  const quantityRef = useRef();

  useEffect(() => {
    if (quantityRef && quantityRef.current) {
      const quantityContainer = quantityRef.current;
      if (!quantityContainer.classList.contains('hide')) {
        quantityContainer.focus();
      }
      quantityRef.current.addEventListener('blur', (evt) => {
        // <Quantity> will be removed when minus is clicked until zero
        if (quantityRef.current) {
          quantityRef.current.classList.add('hide');
        }
      })
    }

  });

  // const itemLink = `/items/item_${item.product_id}`;
  const { product_id } = item;
  const path = location.pathname;
  const itemLink = `${path}?item=${item.product_id}`;
  const cartQuantity = cart.items[product_id] ? cart.items[product_id] : 0;
  const buttonSpan = cartQuantity ? cartQuantity : '+';
  return (
    <Card className="item" key={item.product_id} data-product_id={item.product_id}>
      <Link to={itemLink} className="item-img">
        <img src={item.src} alt={item.name} />
      </Link>
      <div className="item-content">
        <div className="item-price">{item.price}&nbsp;{item.affix}</div>
        <span className="item-name">{item.name}</span>
        {/*<div className="item-size">{item.size}</div>*/}
      </div>
      <button className="item-button" onClick={addToCart}>
        <span className="button-span">{buttonSpan}</span>
      </button>
      { cartQuantity && <Quantity item={item} ref={quantityRef} />}
    </Card>
  )
}