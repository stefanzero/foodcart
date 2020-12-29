import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Items from '../data/items';
import Sidebar from "./Sidebar";
import products from '../data/products';
import Departments from "./Departments";
import ItemModal from "./ItemModal";

function Main(props) {

  const match = window.location.pathname.match(/^\/costco\/departments\//);
  if (!match) {
    window.location.href = '/costco/departments/120/';
  }

  return (
    <Router>
      <Routes>
        <Route path="/costco/departments/:department_id" element={
          <div className="main  container-fluid">
              <Sidebar products={products} className="sidebar" />
              <Departments products={products}/>
              <ItemModal items={Items}/>
          </div>
        }>
          <Route path="aisles/*" element={
            <div className="main  container-fluid">
              <Sidebar products={products} className="sidebar" />
              <Departments products={products}/>
              <ItemModal items={Items}/>
            </div>
          }>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default Main;
