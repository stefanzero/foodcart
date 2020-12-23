import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalSection from "./ModalSection";
const queryString = require('query-string');

export default function ItemModal(props) {

  // const prevHref = props.prevHref || '/costco/departments/120';
  // const handleClose = () => {
  //   window.location.href = prevHref;
  // }
  const href = window.location.href;
  const parsed = queryString.parse(window.location.search)
  const baseHref = href.replace(/\?.*/, '');
  const handleClose = () => {
    window.location.href = baseHref;
  }
  const show = !!parsed.item;
  let item;
  if (props.items && parsed.item) {
    item = props.items[parsed.item]
    console.log(item);
  }

  if (!item) {
    return (
      <Modal show={show} onHide={handleClose} className="item-modal">
        <Modal.Header closeButton>
          <Modal.Title>Product Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }

  if (!item.sections) {
    item.sections = []
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
            item.sections.map((section, i) => {
              return (
                <ModalSection key={i} section={section} />
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
