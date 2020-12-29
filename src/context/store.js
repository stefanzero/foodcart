import React, {createContext, useReducer, useCallback, useContext} from 'react';

/*
 * cart and products will have other properties,
 * initially they just have a items object,
 */
const initialState = {
  cart: {
    items: {
      // product_id: quantity
    }
  },
  favorites: {
    items: {
      // product_id: quantity
    }
  }
};

const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {

  const memoizedReducer = useCallback((state, action) => {
    switch (action.type) {
      case 'addToCart':
        // do something with the action
        const {product_id, quantity} = action.payload;
        // console.log(`reducer: ${product_id}`);
        const newState = {...state};
        const {items} = newState.cart;
        if (!items[product_id]) {
          items[product_id] = quantity;
        } else {
          items[product_id] += quantity;
        }
        // New quantity cannot be less than zero
        items[product_id] = Math.max(items[product_id], 0);
        // console.log(`new quantity: ${items[product_id]}`);
        return newState;
      default:
        throw new Error();
    }
    ;
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addToCart':
        const {product_id, quantity} = action.payload;
        console.log(`reducer: ${product_id}`);
        const newState = {...state};
        const {items} = newState.cart;
        if (!items[product_id]) {
          items[product_id] = quantity;
        } else {
          items[product_id] += quantity;
        }
        // New quantity cannot be less than zero
        items[product_id] = Math.max(items[product_id], 0);
        // console.log(`new quantity: ${items[product_id]}`);
        return newState;
      default:
        throw new Error();
    };
  };

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }