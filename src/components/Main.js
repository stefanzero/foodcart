import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Items from '../data/items';
import Sidebar from "./Sidebar";
import products from '../data/products';
import Departments from "./Departments";
import ItemModal from "./ItemModal";

function Main(props) {

  return (
    <Router>
      <Routes>
        <Route path="/costco/departments/*" element={
          <div className="main  container-fluid">
              <Sidebar products={products} className="sidebar" />
              <Departments products={products}/>
              <ItemModal items={Items}/>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default Main;
