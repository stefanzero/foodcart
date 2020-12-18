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
  // choose the first aisle that has items as the default
  // const aisle0 = department.order[0];
  if (!department.order) {
    debugger;
  }
  let aisle0 = department.order[0];
  for (let i = 0; i < department.order.length; i++) {
    const aisle_id = department.order[i];
    const aisle = department.aisles[aisle_id];
    if (aisle && aisle.order.length) {
      aisle0 = department.order[i];
      break;
    }
  }

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