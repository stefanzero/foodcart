import React, { useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import ModalSection from "./ModalSection";
import { store } from '../context/store';

const queryString = require('query-string');

export default function ItemModal(props) {

  const globalState =  useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;

  const navigate = useNavigate();
  const parsed = queryString.parse(window.location.search);
  const handleClose = () => {
    navigate(window.location.pathname);
  };
  const buttonRef = useRef();
  const selectRef = useRef();
  const selectGroupRef = useRef();
  const inputRef = useRef();
  const inputGroupRef = useRef();
  const inCartRef = useRef();
  const inCartGroupRef = useRef();
  const formRow1Ref = useRef();
  const formRow2Ref = useRef();
  const formRow3Ref = useRef();
  const updateGroupRef = useRef();
  const updateCartRef = useRef();
  const inputUpdateRef = useRef();
  const updateButtonRef = useRef();
  const show = !!parsed.item;
  const { items } = props;
  const item = (items && parsed.item) ? items[parsed.item] : null;
  const sections = (item && item.sections) ? item.sections : [];
  // console.log(`ItemModal: ${item}`);

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
    if (sectionRefsArray) {
      sectionRefsArray.forEach(sectionRef => {
        const {section, leftButton, rightButton} = sectionRef;
        if (section && leftButton && rightButton) {
          const sectionEl = section.current;
          const leftButtonEl = leftButton.current;
          const rightButtonEl = rightButton.current;
          /*
          Only display leftButton if section is scrolled to the right
           */
          if (sectionEl && leftButtonEl) {
            if (sectionEl.scrollLeft > 0) {
              leftButtonEl.classList.remove('hide')
            } else {
              leftButtonEl.classList.add('hide')
            }
          }
          /*
          Only display rightButton if section can be scrolled to the right
           */
          if (sectionEl && rightButtonEl) {
            if ((sectionEl.scrollLeft + sectionEl.offsetWidth) < sectionEl.scrollWidth) {
              rightButtonEl.classList.remove('hide');
            } else {
              rightButtonEl.classList.add('hide');
            }
          }
          /*
           After scroll event, check scrollability and set button display classes
           */
          if (sectionEl) {
            sectionEl.addEventListener('scroll', (e) => {
              if (leftButtonEl) {
                if (sectionEl.scrollLeft > 0) {
                  leftButtonEl.classList.remove('hide')
                } else {
                  leftButtonEl.classList.add('hide')
                }
              }
              if (rightButtonEl) {
                if ((sectionEl.scrollLeft + sectionEl.offsetWidth) < sectionEl.scrollWidth) {
                  rightButtonEl.classList.remove('hide');
                } else {
                  rightButtonEl.classList.add('hide');
                }
              }
            })
          }
        }
      })
    }
  });

  const onSelectChange = (evt) => {
    if (selectRef.current.value === "-1") {
      selectGroupRef.current.classList.add('hide');
      inputGroupRef.current.classList.remove('hide');
      buttonRef.current.setAttribute('disabled', 'disabled');
    } else {
      selectGroupRef.current.classList.remove('hide')
      inputGroupRef.current.classList.add('hide')
    }
  };

  const onInputChange = (evt) => {
    const inputValue = inputRef.current.value;
    if (inputValue > 0 && inputValue <=100) {
      buttonRef.current.removeAttribute('disabled');
    } else {
      buttonRef.current.setAttribute('disabled', 'disabled');
    }
  };

  const onInCartChange = (evt) => {
    if (inCartRef.current.value === "-1") {
      addToCart(-parseInt(quantity));
      selectRef.current.value = "1";
      inCartRef.current.value = "1";
      formRow1Ref.current.classList.remove('hide');
      formRow2Ref.current.classList.add('hide');
    } else if (inCartRef.current.value === "-2") {
      /*
       * TODO
       * Display updateInput
       */
      updateCartRef.current.value = "-2";
      formRow1Ref.current.classList.add('hide');
      formRow2Ref.current.classList.add('hide');
      formRow3Ref.current.classList.remove('hide');
    } else {
      updateCartRef.current.value = inCartRef.current.value;
      formRow1Ref.current.classList.add('hide');
      formRow2Ref.current.classList.add('hide');
      formRow3Ref.current.classList.remove('hide');
    }
  };

  const onUpdateCartChange = (evt) => {

  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // console.log(selectRef.current.value);
    let newQuantity = 0;
    if (selectRef.current.value === "-1") {
      newQuantity = inputRef.current.value;
    } else {
      newQuantity = selectRef.current.value;
    }
    addToCart(parseInt(newQuantity));
    formRow1Ref.current.classList.add('hide');
    formRow2Ref.current.classList.remove('hide');
  };

  const onUpdateQuantity = (evt) => {
    let deltaQuantity = 0;
    formRow1Ref.current.classList.add('hide');
    formRow2Ref.current.classList.remove('hide');
    formRow3Ref.current.classList.add('hide');
    if (updateCartRef.current.value > 0) {
      deltaQuantity = updateCartRef.current.value - quantity;
    } else if (updateCartRef.current.value === -1) {
      /*
       * Show row1 if item has been removed from cart
       */
      deltaQuantity = -1;
      selectRef.current.value = 1;
      formRow1Ref.current.classList.remove('hide');
      formRow2Ref.current.classList.add('hide');
    }
    addToCart(parseInt(deltaQuantity));
  };

  const addToCart = (quantity) => {
    dispatch({
      type: 'addToCart',
      payload: {
        product_id,
        quantity
      }
    })
  };

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
  const { product_id } = item;
  const productNum = parseInt(product_id);
  const quantity = cart.items[productNum] ? cart.items[productNum] : 0;
  const hideQuantity1 = quantity === 0 ? '' : 'hide';
  const hideQuantity2 = quantity === 0 ? 'hide' : '';
  const inCartOptions = [];
  let inCartValue = quantity;
  let updateCartValue = quantity;
  if (quantity > 9) {
    inCartValue = 0;
    inCartOptions.push({value: -3, option: `${quantity}` in cart});
  }
  for (let i = 1; i <= 9; i++) {
    const inCart = i === quantity ? ' in cart' : '';
    inCartOptions.push({value: i, option:`${i}${inCart}`})
  }
  inCartOptions.push({value: -2, option: 'Custom Amount'});
  inCartOptions.push({value: -1, option: 'Remove from cart'});

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="item-modal">
      <Modal.Header closeButton>
        {/*<Modal.Title>Modal heading</Modal.Title>*/}
        <p>
        {item.breadcrumbs.map((bc, i) => {
          const href = bc.href.startsWith('/') ? bc.href : `/${bc.href}`;
          const sep = i < item.breadcrumbs.length - 1 ? ' > ' : '';
          return (
            <span key={i}>
              <span>
                <Link to={href} key={i}>{bc.text}</Link>
              </span>
              <span>
                {sep}
              </span>
            </span>
          )
        })}
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-row1">
          <div className="square">
            <div className="modal-img">
              <img src={item.src} alt={item.name}/>
            </div>
          </div>
          <div className="square">
            <div className="modal-description">
              <p className="modal-name">
                {item.name}
              </p>
              <p className="modal-price">
                {item.price}
              </p>
              <Form onSubmit={onSubmit} className="modal-form">
                <Form.Row className={`modal-form-row ${hideQuantity1}`} ref={formRow1Ref}>
                  <div className="quantity-column-1">
                    <Form.Group controlId="modal-quantity" className="modal-quantity"
                                ref={selectGroupRef}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control as="select" size="lg" custom className="modal-quantity-select"
                                    ref={selectRef} onChange={onSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="-1">custom amount</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="modal-quantity-input" className="modal-quantity-input-group hide"
                                ref={inputGroupRef}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="number" className="modal-quantity-input" ref={inputRef}
                                    placeholder="Enter an amount" onChange={onInputChange}/>
                    </Form.Group>
                  </div>
                  <div className="modal-button-row">
                    <Button className="btn-success" type="submit" onSubmit={onSubmit}
                            ref={buttonRef}>+ Add To Cart</Button>
                  </div>
                </Form.Row>
                <Form.Row className={`modal-form-row ${hideQuantity2}`} ref={formRow2Ref}>
                  <Form.Group controlId="modal-incart-group" className="modal-incart-group"
                              ref={inCartGroupRef}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control as="select" size="lg" custom ref={inCartRef} className="modal-incart-select"
                                  value={inCartValue} onChange={onInCartChange}>
                      {
                        inCartOptions.map(o => {
                          return (
                            <option value={o.value}>{o.option}</option>
                          )
                        })
                      }
                      {/*<option value="1">{quantity} in cart</option>*/}
                      {/*<option value="-1">remove from cart</option>*/}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row className="modal-form-update-row hide" ref={formRow3Ref}>
                  <Form.Group controlId="modal-update-group" className="modal-update-group"
                              ref={updateGroupRef}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control as="select" size="lg" custom ref={updateCartRef} className="modal-update-select"
                                  onChange={onUpdateCartChange}>
                      {
                        inCartOptions.map(o => {
                          return (
                            <option value={o.value}>{o.option}</option>
                          )
                        })
                      }
                    </Form.Control>
                  </Form.Group>
                  <div className="modal-button-row">
                    <Button className="btn-success" onClick={onUpdateQuantity}
                            ref={updateButtonRef}>Update Quantity</Button>
                  </div>
                </Form.Row>
              </Form>
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
