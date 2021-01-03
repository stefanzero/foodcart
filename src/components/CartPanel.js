import React, {Fragment, useContext} from 'react';
import { Collapse } from "react-bootstrap";

import { store } from '../context/store';

export default function CartPanel(props) {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { cartPanel } = state;
  const { show } = cartPanel;

  if (!show) {
    return null;
  }

  const toggleCartPanel = () => {
    dispatch({type: 'toggleCartPanel'});
  }

  return (
    <Fragment>
      <div className="backdrop" onClick={toggleCartPanel}></div>
      <div className="cart-panel">
        <div className="cart-panel-header">
          <span>Cart</span>
          <button className="cart-panel-close btn btn-light" onClick={toggleCartPanel}>
          </button>
        </div>
        <div className="cart-panel-body">

        </div>
      </div>
    </Fragment>
  )
}

