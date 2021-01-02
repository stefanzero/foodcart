import React, { useContext } from 'react';

import { store } from '../context/store';

export default function Header(props) {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  const totalItems = Object.values(cart.items).reduce((acc, next) => {
    return acc + next;
  }, 0);

  return (
    <header className="header">
      <span className="brand">foodcart</span>
      <button className="cart-button">
        Order
        <img src="/images/green-cart.png" alt="shopping basket" />
        <span className="cart-button-quantity">{totalItems}</span>
      </button>
    </header>
  )

}



