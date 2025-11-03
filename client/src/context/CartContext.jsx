import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Create Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // store list of cart items
  const [cartCount, setCartCount] = useState(0);

  //  Function to add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        // if already in cart, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // if new item, add with quantity = 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setCartCount((prev) => prev + 1);
  };

  //  Function to remove single item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (!itemToRemove) return prevItems;

      setCartCount((prev) => prev - itemToRemove.quantity);
      return prevItems.filter((item) => item.id !== id);
    });
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
