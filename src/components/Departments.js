import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Item from "./Item";

export default function Departments(props) {

  const products = props.products;
  // const href = window.location.href;
  const location = useLocation();
  const navigate = useNavigate();
  const dept_match = location.pathname.match(/departments\/(\d+)($|\/)/);
  // department 120 (produce) is the default
  const dept_id = dept_match ? `${dept_match[1]}` : '120';
  /*
   * Test using fixed department and first aisle
   */
  // const department = products.departments['120'];
  const department = products.departments[dept_id];
  const aisle_match = location.pathname.match(/aisles\/(\d+)($|\/|\?)/);
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
  if (!aisle_match) {
    navigate(`${location.pathname}/aisles/${aisle0}`)
  }

  // const aisle_id = department.order[0];
  const aisle_id = aisle_match ? `${aisle_match[1]}` : `${aisle0}`;
  const aisle = department.aisles[aisle_id];
  /*
   * There are occassional duplicate items in aisle.order
   */
  const uniqueItems = [...new Set(aisle.order)];
  const items = uniqueItems.map(id => {
    return aisle.items[id]
  });

  // console.log(`aisle: ${aisle.name}`);
  return (
    <div className="items">
      {
        items.map(item => {
          // console.log(`item: ${item.name}`);
          return (
            <Item item={item} key={item.product_id}/>
          )
        })
      }
    </div>
  )
}