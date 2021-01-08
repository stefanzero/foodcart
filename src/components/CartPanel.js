import React, {Fragment, useContext, useEffect, useRef} from 'react';

import CartItem from "./CartItem";
import { store } from '../context/store';

export default function CartPanel(props) {

  const { items } = props;
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cart, cartPanel } = state;
  const { show } = cartPanel;
  const { order } = cart;

  const cartPanelRef = useRef();
  useEffect(() => {
    if (cartPanelRef && cartPanelRef.current) {
      cartPanelRef.current.addEventListener('focus', () => {
        // setHide(true);
        const quantities = document.querySelectorAll('.cart-item .quantity-container');
        quantities.forEach(q => {
          q.classList.add('hide');
        })
      })
    }

  });

  if (!show) {
    return null;
  }

  const toggleCartPanel = () => {
    dispatch({type: 'toggleCartPanel'});
  };

  return (
    <Fragment>
      <div className="backdrop" onClick={toggleCartPanel}></div>
      <div className="cart-panel" ref={cartPanelRef} tabIndex="2">
        <div className="cart-panel-header">
          <span>Cart</span>
          <button className="cart-panel-close btn btn-light" onClick={toggleCartPanel}>
          </button>
        </div>
        <div className="cart-panel-body">
          {
            order.map(id => {
              return (
                <CartItem key={id} item={items[id]}/>
              )
            })
          }
        </div>
      </div>
    </Fragment>
  )
}

