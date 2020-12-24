import React, { forwardRef, useRef } from 'react';
import Item from './Item';

export default forwardRef((props, ref) => {

  ref.section = useRef();
  ref.leftButton = useRef();
  ref.rightButton = useRef();

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
    <section className="modal-section-container">
      <h5>{section.name}</h5>
      <div className="modal-section" ref={ref.section}>
        {
          validItems.map(item => {
            return (
              <Item item={item} key={item.product_id}/>
            )
          })
        }
      </div>
      <div className="left-button" role="button" ref={ref.leftButton}>
        <span className="helper"></span>
        <span className="fa fa-chevron-left"></span>
      </div>
      <div className="right-button" role="button" ref={ref.rightButton}>
        <span className="fa fa-chevron-right"></span>
      </div>
    </section>
  )
})