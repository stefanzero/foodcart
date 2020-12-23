import React from 'react';
import Item from './Item';

export default function ModalSection(props) {

  const { section, items } = props;
  if (!section || !section.items || !section.items.length ) {
    return null;
  }

  /*
   * Remove items not found
   */
  const validItems = [];
  for (let i = 0; i < section.items.length; i++) {
    const item = section.items[i];
    if (item.name !== '') {
      if (items[item.product_id]) {
        validItems.push(item)
      }
    }
  }
  if (!validItems.length) {
    return null;
  }

  return (
    <section>
      <h5>{section.name}</h5>
      <div className="modal-section">
        {
          validItems.map(item => {
            return (
              <Item item={item} key={item.product_id}/>
            )
          })
        }
      </div>
    </section>
  )
}