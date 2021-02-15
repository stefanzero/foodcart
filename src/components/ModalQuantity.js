import React, {useContext, useState, useRef, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { store } from '../context/store';

export default function ModalQuantity(props) {

  const {item} = props;
  const {product_id} = item;
  const productNum = parseInt(product_id);

  const globalState =  useContext(store);
  const { state, dispatch } = globalState;
  const { cart } = state;
  const cartQuantity = cart.items[productNum] ? cart.items[productNum] : 0;

  const addToCart = (quantity) => {
    const deltaQuantity = quantity - cartQuantity;
    dispatch({
      type: 'addToCart',
      payload: {
        product_id,
        quantity: deltaQuantity
      }
    })
  };

  const formRef = useRef();
  const quantityRef = useRef();
  const buttonRef = useRef();

  const onSubmit = (evt) => {
    evt.preventDefault();
    let newQuantity = quantityRef.current ? quantityRef.current.value : 0;
    addToCart(parseInt(newQuantity));
    const newDisplayState = newQuantity === 0 ? 1 : 2;
    setDisplayState(newDisplayState);
  };

  const onSelectChange0 = () => {
    const {value} = quantityRef.current;
    if (value === 'custom') {
      setDisplayState(1);
    }

  };

  const onInputChange = () => {
    const {value} = quantityRef.current;
    if ((value > 0) && (value <= 100)) {
      buttonRef.current.removeAttribute('disabled')
    } else {
      buttonRef.current.setAttribute('disabled', true);
    }
  };

  const onSelectChange2 = () => {
    const {value} = quantityRef.current;
    if (value === 'remove') {
      addToCart(-cartQuantity);
      setDisplayState(0);
    } else if (value === 'custom') {
      setDisplayState(4);
    } else {
      setDisplayState(3);
    }
  };

  const onSelectChange3 = () => {
    const {value} = quantityRef.current;
    if (value === 'remove') {
      addToCart(-cartQuantity);
      setDisplayState(0);
    } else if (value === 'custom') {
      setDisplayState(4);
    }
  };

  /*
   * Display states:
   *
   * 0 empty cart:  select options and button "add to cart"
   * 1 empty cart & custom quantity: input and button "add to cart"
   * 2 item in cart: select options
   * 3 item in cart - quantity selected: select options and button "update quantity"
   * 4 item in cart - custom quantity: input and button "update quantity"
   */

  const initialDisplayState = cartQuantity === 0 ? 0 : 2;
  const [displayState, setDisplayState] = useState(initialDisplayState);
  const [lastId, setLastId] = useState();
  if (lastId !== product_id) {
    setLastId(product_id);
    // console.log('new item');
    if (cartQuantity === 0) {
      setDisplayState(0);
    }
  }

  /*
   * empty cart - display select
   */
  const display0 = () => (
    <Form.Row className={`modal-form-row`}>
      <Form.Group controlId="modal-quantity" className="modal-quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control as="select" size="lg" custom className="modal-quantity-select"
                      ref={quantityRef} onChange={onSelectChange0}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="custom">custom amount</option>
        </Form.Control>
      </Form.Group>
      <div className="modal-button-row">
        <Button className="btn-success" type="submit" onSubmit={onSubmit}
                ref={buttonRef}>+ Add To Cart</Button>
      </div>
    </Form.Row>
  );

  /*
   * empty cart, custom quantity - display input
   */
  const display1 = () => (
    <Form.Row className={`modal-form-row`}>
      <Form.Group controlId="modal-quantity" className="modal-quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" className="modal-quantity-input" ref={quantityRef}
                      placeholder="Enter an amount" onChange={onInputChange}/>
      </Form.Group>
      <div className="modal-button-row">
        <Button className="btn-success" type="submit" onSubmit={onSubmit} disabled={true}
                ref={buttonRef}>+ Add To Cart</Button>
      </div>
    </Form.Row>
  );

  /*
   * item in cart, display select - no button
   */
  const display2 = () => {
    const inCartOptions = [];
    let value = cartQuantity;
    if (cartQuantity > 9) {
      inCartOptions.push({value: cartQuantity, option: `${cartQuantity} in cart`})
    }
    for (let i = 1; i < 10; i++) {
      const inCart = i === cartQuantity ? ' in cart' : '';
      inCartOptions.push({value: i, option: `${i}${inCart}`});
    }
    inCartOptions.push({value: 'custom', option: 'Custom Amount'});
    inCartOptions.push({value: 'remove', option: 'Remove from cart'});
    return (
      <Form.Row className={``}>
        <Form.Group controlId="modal-quantity" className="modal-quantity modal-incart-group">
          <Form.Label>Quantity</Form.Label>
          <Form.Control as="select" size="lg" custom className="modal-quantity-select"
                        ref={quantityRef} onChange={onSelectChange2} value={value}>
            {inCartOptions.map(o => (
              <option value={o.value} key={o.value}>{o.option}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    )
  };

  /*
   * update item in cart, display select and update button
   */
  const display3 = () => {
    const {value} = parseInt(quantityRef.current);
    const updateOptions = [];
    if (value > 9) {
      updateOptions.push({value, option: value});
    }
    for (let i = 1; i < 10; i++) {
      const inCart = i === cartQuantity ? ' in cart' : '';
      updateOptions.push({value: i, option: `${i}${inCart}`});
    }
    updateOptions.push({value: 'custom', option: 'Custom Amount'});
    updateOptions.push({value: 'remove', option: 'Remove from cart'});
    return (
      <Form.Row className={``}>
        <Form.Group controlId="modal-quantity" className="modal-quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control as="select" size="lg" custom className="modal-quantity-select"
                        ref={quantityRef} onChange={onSelectChange3} value={value}>
            {updateOptions.map(o => (
              <option value={o.value} key={o.value}>{o.option}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="modal-button-row">
          <Button className="btn-success" type="submit" onSubmit={onSubmit}
                  ref={buttonRef}>Update Quantity</Button>
        </div>
      </Form.Row>
    )
  };

  /*
   * non-empty cart, custom quantity - display input
   */
  const display4 = () => (
    <Form.Row className={`modal-form-row`}>
      <Form.Group controlId="modal-quantity" className="modal-quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" className="modal-quantity-input" ref={quantityRef}
                      placeholder="Enter an amount" onChange={onInputChange}/>
      </Form.Group>
      <div className="modal-button-row">
        <Button className="btn-success" type="submit" onSubmit={onSubmit} disabled={true}
                ref={buttonRef}>Update Quantity</Button>
      </div>
    </Form.Row>
  );

  let display;
  switch (displayState) {
    case 0:
      display = display0();
      break;
    case 1:
      display = display1();
      break;
    case 2:
      display = display2();
      break;
    case 3:
      display = display3();
      break;
    case 4:
      display = display4();
      break;
    default:
      display = null;
  }

  return (
    <Form onSubmit={onSubmit} className="modal-form" ref={formRef} data-product_id={item.product_id}>
      {display}
    </Form>
  )
}