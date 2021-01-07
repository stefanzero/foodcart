import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { store } from '../context/store';
import Quantity from './Quantity';

export default function CartItem(props) {
  const { item, showQuantity } = props;
  const location = useLocation();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  /*
   * Display <Quantity> only after the number button is clicked
   * First, hide all <Quantity> components
   */
  const show = () => {
    const quantities = document.querySelectorAll('.cart-item .quantity-container');
    quantities.forEach(q => {
      q.classList.add('hide');
    })
    if (cartQuantity && quantityRef.current) {
      quantityRef.current.classList.remove('hide');
      return;
    }
  };

  const addToCart = (quantity) => {
    // console.log(`addToCart: ${product_id}`);
    /*
     * Display <Quantity> only after the number button is clicked
     */
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

  const containerRef = useRef();
  const quantityRef = useRef();

  /*
   * Hide the quantity component when
   *   * focus is lost from the quantity component
   *   * the window is scrolled
   */
  const hideComponent = (evt) => {
    if (quantityRef.current && !quantityRef.current.classList.contains('hide')) {
      quantityRef.current.classList.add('hide');
    }
  };
  useEffect(() => {
    console.log(`CartItem.useEffect: ${item.name}`);
    console.log(`activeElement: ${document.activeElement}`);
    if (quantityRef && quantityRef.current) {
      document.addEventListener('scroll', hideComponent);
    }
  }, document.removeEventListener('scroll', hideComponent));

  const { product_id } = item;
  const path = location.pathname;
  const itemLink = `${path}?item=${item.product_id}`;
  const cartQuantity = cart.items[product_id] ? cart.items[product_id] : 0;
  /*
   * Remove extraneous characters from price such as "/each"
   */
  const priceMatch = item.price.match(/(\$[\d\.]+)/);
  let price = item.price;
  if (priceMatch && priceMatch.length ==2) {
    price = priceMatch[1];
  }
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
        <button className="cart-item-button" onClick={show}>
          <span className="cart-button-span">{cartQuantity}</span>
        </button>
      </div>
      <div className="cart-item-price">
        {price}
      </div>
      <Quantity item={item} ref={quantityRef} />
    </div>
  )
}