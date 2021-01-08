import React, {createContext, useReducer, useCallback } from 'react';

/*
 * cart and products will have other properties,
 * initially they just have a items object,
 */
const initialState = {
  cart: {
    items: {
      // product_id: quantity
    },
    order: []
  },
  favorites: {
    items: {
      // product_id: quantity
    }
  },
  cartPanel: {
    show: false
  }
};

const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {

  /*
   * React will call the reducer an extra time if it is not memoized,
   * since without memoization, it appears as a changed function.
   */
  const memoizedReducer = useCallback((state, action) => {
    switch (action.type) {
      case 'addToCart':
        // do something with the action
        const {product_id, quantity} = action.payload;
        if (typeof quantity !== 'number') {
          throw new Error('quantity must be a number')
        }
        // console.log(`reducer: ${product_id}`);
        const newState = {
          ...state,
          cart: {
            ...state.cart,
            items: {
              ...state.cart.items,
            },
            order: state.cart.order.slice()
          }
        };
        const { items, order } = newState.cart;
        if (!items[product_id]) {
          items[product_id] = quantity;
        } else {
          items[product_id] += quantity;
        }
        // New quantity cannot be less than zero
        items[product_id] = Math.max(items[product_id], 0);
        const newQuantity = items[product_id];
        if (newQuantity === 0) {
          newState.cart.order = order.filter(id => id !== product_id);
        } else if (!order.includes(product_id)) {
          order.push(product_id)
        }
        // console.log(`new quantity: ${items[product_id]}`);
        return newState;
      case 'toggleCartPanel':
        return {
          ...state,
          cartPanel: {
            ...state.cartPanel,
            show: !state.cartPanel.show
          }
        };
      default:
        throw new Error();
    }
    ;
  }, []);

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }