import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Item from "./Item";

export default function Departments(props) {

  const itemsContainer = useRef();
  const { products, items } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const dept_match = location.pathname.match(/departments\/(\d+)($|\/)/);
  // department 120 (produce) is the default
  const dept_id = dept_match ? `${dept_match[1]}` : '120';
  const department = products.departments[dept_id];
  const aisle_match = location.pathname.match(/aisles\/(\d+)($|\/|\?)/);
  // choose the first aisle that has items as the default
  let aisle0 = department.order[0];
  for (let i = 0; i < department.order.length; i++) {
    const aisle_id = department.order[i];
    const aisle = department.aisles[aisle_id];
    if (aisle && aisle.order.length) {
      aisle0 = department.order[i];
      break;
    }
  }
  /*
   * Ensure URL is departments/:department_id/ailses/:aisle_id
   */
  if (!aisle_match) {
    navigate(`${location.pathname}/aisles/${aisle0}`)
  }

  const aisle_id = aisle_match ? `${aisle_match[1]}` : `${aisle0}`;
  const aisle = department.aisles[aisle_id];
  /*
   * There are occasional duplicate items in aisle.order
   */
  const uniqueItems = [...new Set(aisle.order)];
  /*
   * Create array in order, and check that the product_id also exists
   * in the items props
   */
  const aisleItems = uniqueItems.map(id => {
    return items[id] && aisle.items[id]
  }).filter(item => {
    return !!item;
  });

  // console.log(`aisle: ${aisle.name}`);
  return (
    <div className="items" ref={itemsContainer}>
      {
        aisleItems.map(item => {
          // console.log(`item: ${item.name}`);
          return (
            <Item item={item} key={item.product_id}/>
          )
        })
      }
    </div>
  )
}