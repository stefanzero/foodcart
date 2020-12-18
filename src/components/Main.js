import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Vegetables from '../data/Vegetables'
import Order from '../data/order.Vegetables'
import Item from './Item';
import Sidebar from "./Sidebar";
import products from '../data/products';
import Departments from "./Departments";


function Main(props) {

  const items = Order.map(product_id => {
    return Vegetables[product_id]
  });

  return (
    <Router>
      <div className="main  container-fluid">
        <Sidebar products={products} className="sidebar" />
        {/*<Departments products={products}/>*/}
        <Routes>
          <Route path="*" element={
            <Departments products={products}/>
          } />
        </Routes>
        {/*<div className="items">*/}
        {/*  {*/}
        {/*    items.map(item => {*/}
        {/*      return (*/}
        {/*        <Item item={item} key={item.product_id}/>*/}
        {/*      )*/}
        {/*    })*/}
        {/*  }*/}
        {/*</div>*/}
      </div>
    </Router>
  )

}

export default Main;
