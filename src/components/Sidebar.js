import React, {useState} from 'react';
import { NavLink, Collapse } from 'react-bootstrap';

export default function Sidebar({products}) {
  let [open, setOpen] = useState({})
  const href = window.location.href
  // const href = '/costco/departments/120/';
  const dept_match = href.match(/departments\/(\d+)($|\/)/)
  const dept_id = dept_match ? dept_match[1] : '';
  const aisle_match = href.match(/aisles\/(\d+)($|\/)/)
  const a_id = aisle_match ? aisle_match[1] : '';
  let isOpen = {};
  if (a_id && dept_id) {
    const department = products.departments[dept_id];
    const aisles = department.aisles;
    if (aisles[a_id]) {
      isOpen[dept_id] = true;
    }
  }

  const expand = (department_id) => {
    setOpen({[department_id]: !open[department_id]})
  }

  return (
    <ul className="sidebar-list">
      {
        products.order.map((department_id)=> {
          const department = products.departments[department_id]
          const aisles = department.aisles;
          const aisle_ids = Object.keys(aisles);
          const expanded = open[department_id] || isOpen[department_id];
          const rotated = expanded ? 'rotate' : '';
          return (
            <li key={department_id} className="sidebar-item">
              <div>
                <a href={`/${department.href}`}>{department.name}</a>
                <Collapse in={expanded}>
                  <ul className="aisle-items">
                    {
                      aisle_ids.map(aisle_id => {
                        const aisle = aisles[aisle_id]
                        return (
                          <li key={aisle_id} className="aisle-item">
                            <a href={`/${aisle.href}`}>
                              {aisle.name}
                            </a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </Collapse>
              </div>
              <button className={`department-button department-${department_id}`}
              onClick={() => expand(department_id)}>
                <span className={rotated}>></span>
              </button>
            </li>
          )
        })
      }
   </ul>
  )
}

