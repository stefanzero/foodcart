import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Items from '../data/items';
import Sidebar from './Sidebar';
import products from '../data/products';
import Departments from './Departments';
import ItemModal from './ItemModal';
import CartPanel from './CartPanel';

function Main(props) {

  const match = window.location.pathname.match(/^\/costco\/departments\//);
  if (!match) {
    window.location.href = '/costco/departments/120/';
  }

  const mainContent = (
    <div className="main container-fluid">
      <Sidebar products={products} className="sidebar" />
      <Departments products={products}/>
      <ItemModal items={Items}/>
      <CartPanel show={true} />
    </div>
  )

  return (
    <Router>
      <Routes>
        <Route path="*" element={mainContent} />
      </Routes>
    </Router>
  )
}

export default Main;
