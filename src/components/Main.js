import React from 'react';

import Vegetables from '../data/Vegetables'
import Order from '../data/order.Vegetables'
import Item from './Item';
import Sidebar from "./Sidebar";
import products from '../data/products';


export default function Main(props) {

  const items = Order.map(product_id => {
    return Vegetables[product_id]
  });

  return (
    <div className="main  container-fluid">
      <Sidebar products={products} className="sidebar" />
      <div className="items">
        {
          items.map(item => {
            return (
              <Item item={item} key={item.product_id}/>
            )
          })
        }
      </div>
    </div>
  )

}
