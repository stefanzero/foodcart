import React, { useContext } from 'react';

import { store } from '../context/store';

export default function Header(props) {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  const toggleCartPanel = () => {
    dispatch({type: 'toggleCartPanel'})
  };

  const totalItems = Object.values(cart.items).reduce((acc, next) => {
    return acc + next;
  }, 0);

  return (
    <header className="header">
      <div>
        <img className="brand-img" src="/images/grocery-store.png" alt="foodcart icon" />
        <span className="brand">foodcart</span>
      </div>

      <button className="cart-button" onClick={toggleCartPanel}>
        Order
        <img src="/images/green-cart.png" alt="shopping basket" />
        <span className="cart-button-quantity">{totalItems}</span>
      </button>
    </header>
  )

}



