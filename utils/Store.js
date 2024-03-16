import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {} }
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id && item.packSizeSelected === newItem.packSizeSelected
      );
    
      if (existingItem) {
        // Item with the same _id and size already exists, update quantity
        const updatedCartItems = state.cart.cartItems.map((item) =>
          item._id === existingItem._id && item.packSizeSelected === existingItem.packSizeSelected
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
    
        Cookies.set('cartItems', JSON.stringify(updatedCartItems));
    
        return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
      }
    
      // Item not found, add as a new line item
      const cartItems = [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
    
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const itemToRemove = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => !(item._id === itemToRemove._id && item.packSizeSelected === itemToRemove.packSizeSelected)
      );

      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems: updatedCartItems }));

      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    }
    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
        },
      };
    case 'CART_CLEAR_ITEMS':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    default: return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}