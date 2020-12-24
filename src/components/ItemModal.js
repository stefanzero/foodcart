import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalSection from "./ModalSection";
const queryString = require('query-string');

export default function ItemModal(props) {

  const href = window.location.href;
  const parsed = queryString.parse(window.location.search)
  const baseHref = href.replace(/\?.*/, '');
  const handleClose = () => {
    window.location.href = baseHref;
  };
  const show = !!parsed.item;
  const { items } = props;
  let item;
  if (items && parsed.item) {
    item = items[parsed.item];
    console.log(item);
  }

  const sections = item && item.sections || [];

  /*
  3 refs are needed from each <ModalSection>, so the left and right Buttons will only
  be displayed when the ModalSection content can be scrolled
   */
  const sectionRefsArray = sections.map(() => {
    return {
      section: null,
      leftButton: null,
      rightButton: null
    }
  });

  useEffect(() => {
    console.log('ItemModal rendered');
    if (sectionRefsArray) {
      sectionRefsArray.forEach(sectionRef => {
        const {section, leftButton, rightButton} = sectionRef;
        if (section && leftButton && rightButton) {
          const sectionEl = section.current;
          const leftButtonEl = leftButton.current;
          const rightButtonEl = rightButton.current;
          if (sectionEl.scrollLeft > 0) {
            leftButtonEl.classList.remove('hide')
          } else {
            leftButtonEl.classList.add('hide')
          }
          if ((sectionEl.scrollLeft + sectionEl.offsetWidth) < sectionEl.scrollWidth) {
            rightButtonEl.classList.remove('hide');
          } else {
            rightButtonEl.classList.add('hide');
          }
          sectionEl.addEventListener('scroll', (e) => {
            if (sectionEl.scrollLeft > 0) {
              leftButtonEl.classList.remove('hide')
            } else {
              leftButtonEl.classList.add('hide')
            }
            if ((sectionEl.scrollLeft + sectionEl.offsetWidth) < sectionEl.scrollWidth) {
              rightButtonEl.classList.remove('hide');
            } else {
              rightButtonEl.classList.add('hide');
            }
          })
        }
      })
    }
  });

  if (!item) {
    return (
      <Modal show={show} onHide={handleClose} className="item-modal">
        <Modal.Header closeButton>
          <Modal.Title>Product Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="item-modal">
      <Modal.Header closeButton>
        {/*<Modal.Title>Modal heading</Modal.Title>*/}
        <p>
        {item.breadcrumbs.map((bc, i) => {
          const sep = i < item.breadcrumbs.length - 1 ? ' > ' : '';
          return (
            <>
              <span>
                <a href={bc.href} key={i}>{bc.text}</a>
              </span>
              <span>
                {sep}
              </span>
            </>
          )
        })}
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-row1">
          <div className="square square1">
            <div className="modal-img">
              <img src={item.src} />
            </div>
          </div>
          <div className="square square2">
            <div className="modal-description">
              <p className="modal-name">
                {item.name}
              </p>
              <p className="modal-price">
                {item.price}
              </p>

            </div>
          </div>
        </div>
        <div className="modal-sections">
          {
            sections.map((section, i) => {
              return (
                <ModalSection key={i} section={section} items={items} ref={sectionRefsArray[i]}/>
              )
            })
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}
