import React from 'react';
import { Card } from 'react-bootstrap';

export default function Item({item}) {
  return (
    <Card className="item" key={item.product_id}>
      <div className="item-img">
        <img src={item.src} alt={item.name} />
      </div>
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