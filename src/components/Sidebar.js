import React from 'react';
import { NavLink } from 'react-bootstrap';

export default function Sidebar({products}) {
  return (
    <ul className="sidebar-list">
      {
        products.order.map((department_id)=> {
          const department = products.departments[department_id]
          return (
            <li key={department_id} className="sidebar-item">
              <a href={department.href}>{department.name}</a>
              >
            </li>
          )
        })
      }
   </ul>
  )
}

