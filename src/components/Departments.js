import React from 'react';
import Item from "./Item";

export default function Departments(props) {

  const products = props.products;
  const href = window.location.href;
  const dept_match = href.match(/departments\/(\d+)($|\/)/);
  const dept_id = dept_match ? `${dept_match[1]}` : '120';
  /*
   * Test using fixed department and first aisle
   */
  // const department = products.departments['120'];
  const department = products.departments[dept_id];
  const aisle_match = href.match(/aisles\/(\d+)($|\/)/);
  const aisle0 = department.order[0];
  // const aisle_id = department.order[0];
  const aisle_id = aisle_match ? `${aisle_match[1]}` : `${aisle0}`;
  const aisle = department.aisles[aisle_id];
  const items = aisle.order.map(id => {
    return aisle.items[id]
  });

  return (
    <div className="items">
      {
        items.map(item => {
          return (
            <Item item={item} key={item.product_id}/>
          )
        })
      }
    </div>
  )
}