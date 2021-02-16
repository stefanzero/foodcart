import React, { useContext, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { store } from '../context/store';
import Quantity from './Quantity';

export default function CartItem(props) {
  const { item } = props;
  const location = useLocation();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart, cartPanel } = state;
  const { product_id_selected } = cartPanel;

  const setProductIdSelected = () => {
    dispatch({
      type: 'selectProductId',
      payload: {
        product_id_selected: product_id
      }
    })
  };

  const unsetProductIdSelected = () => {
    if (product_id_selected) {
      dispatch({
        type: 'selectProductId',
        payload: {
          product_id_selected: null
        }
      })
    }
  };

  const containerRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    containerRef.current.addEventListener('mouseleave', unsetProductIdSelected);
  });

  const { product_id } = item;
  const path = location.pathname;
  const itemLink = `${path}?item=${item.product_id}`;
  const cartQuantity = cart.items[product_id] ? cart.items[product_id] : 0;
  /*
   * Remove extraneous characters from price such as "/each"
   */
  const priceMatch = item.price.match(/(\$[\d.]+)/);
  let price = item.price;
  if (priceMatch && priceMatch.length === 2) {
    price = priceMatch[1];
  }
  const showQuantity = product_id_selected === product_id;
  return (
    <div className="cart-item" key={item.product_id} data-product_id={item.product_id}
      ref={containerRef}>
      <div>
        <Link to={itemLink} className="cart-item-img">
          <img src={item.src} alt={item.name} />
        </Link>
      </div>
      <div className="cart-item-content">
        <span className="item-name">{item.name}</span>
      </div>
      <div className="cart-item-quantity">
        <button className="cart-item-button" onClick={setProductIdSelected}>
          <span className="cart-button-span">{cartQuantity}</span>
        </button>
      </div>
      <div className="cart-item-price">
        {price}
      </div>
      { showQuantity && <Quantity item={item} ref={quantityRef} hide={false} />}
    </div>
  )
}