import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

export default function Sidebar({products, dept_id, a_id}) {
  let [open, setOpen] = useState({})
  /*
   * If dept_id or a_id (aisle_id) is not in the props, then
   * get it from the URL
   * ex. URL = '/costco/departments/120/aisles/676';
   */
  const location = useLocation();
  if (! dept_id) {
    const dept_match = location.pathname.match(/departments\/(\d+)($|\/)/);
    dept_id = dept_match ? dept_match[1] : '';
  }
  if (! a_id) {
    const aisle_match = location.pathname.match(/aisles\/(\d+)($|\/)/);
    a_id = aisle_match ? aisle_match[1] : '';
  }
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
  };

  return (
    <ul className="sidebar-list">
      {
        products.order.map((department_id)=> {
          const department = products.departments[department_id]
          const aisles = department.aisles;
          const aisle_ids = Object.keys(aisles);
          const expanded = open[department_id] || isOpen[department_id];
          const rotated = expanded ? 'rotate' : '';
          const departmentClass = department_id === dept_id ? 'sidebar-active' : '';
          return (
            <li key={department_id} className="sidebar-item">
              <div>
                <Link to={`/${department.href}`}>
                  <span className={departmentClass}>{department.name}</span>
                </Link>
                <Collapse in={expanded}>
                  <ul className="aisle-items">
                    {
                      aisle_ids.map(aisle_id => {
                        const aisle = aisles[aisle_id]
                        const aisleClass = aisle_id === a_id ? 'sidebar-active' : '';
                        return aisle.order.length > 0 && (
                          <li key={aisle_id} className="aisle-item">
                            <Link to={`/${aisle.href}`}>
                              <span className={aisleClass}>{aisle.name}</span>
                            </Link>
                            {/*<a href={`/${aisle.href}`}>*/}
                            {/*  {aisle.name}*/}
                            {/*</a>*/}
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

