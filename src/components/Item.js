import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { Modal, Button } from "react-bootstrap";


export default function Item({item}) {
  // const itemLink = `/items/item_${item.product_id}`;
  const itemLink = `?item=${item.product_id}`;
  return (
    <Card className="item" key={item.product_id}>
      <a href={itemLink} className="item-img">
        <img src={item.src} alt={item.name} />
      </a>
      <div className="item-content">
        <div className="item-price">{item.price}&nbsp;{item.affix}</div>
        <span className="item-name">{item.name}</span>
        {/*<div className="item-size">{item.size}</div>*/}
      </div>
      <button className="item-button">
        <span className="button-span">+</span>
      </button>
    </Card>
  )
}