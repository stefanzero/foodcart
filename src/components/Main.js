import React from 'react';

import Vegetables from '../data/Vegetables'
import Order from '../data/order.Vegetables'
import Item from './Item';

export default function Main(props) {

  const items = Order.map(product_id => {
    return Vegetables[product_id]
  });

  return (
    <div className="main">
      <div className="items">
        {
          items.map(item => {
            return (
              <Item item={item} />
            )
          })
        }
      </div>
    </div>
  )

}
