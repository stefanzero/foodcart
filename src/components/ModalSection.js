import React from 'react';
import Item from './Item';

export default function ModalSection(props) {

  const { section } = props;
  if (!section || !section.items || !section.items.length ) {
    return null;
  }

  return (
    <section>
      <h5>{section.name}</h5>
      <div className="modal-section">
        {
          section.items.map(item => {
            return (
              <Item item={item} key={item.product_id}/>
            )
          })
        }
      </div>
    </section>
  )
}