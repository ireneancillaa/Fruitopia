import React, { useState, useEffect, useCallback } from 'react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../hooks/useAuthHook'
import { CartContext } from './CartContextSetup'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const loadCartFromFirebase = useCallback(async () => {
    if (!user?.uid) return

    try {
      setLoading(true)
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists() && userDoc.data().cart) {
        setCart(userDoc.data().cart)
      }
    } catch (err) {
      console.error('Failed to load cart:', err)
    } finally {
      setLoading(false)
    }
  }, [user?.uid])

  // Load cart from Firebase when user logs in
  useEffect(() => {
    if (user?.uid) {
      loadCartFromFirebase()
    } else {
      setCart([])
    }
  }, [user?.uid, loadCartFromFirebase])



  const saveCartToFirebase = async (cartData) => {
    if (!user?.uid) return

    try {
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, { cart: cartData })
    } catch (err) {
      console.error('Failed to save cart:', err)
    }
  }

  const addToCart = (product) => {
    const newCart = [...cart]
    const existingItem = newCart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += product.quantity || 1
    } else {
      newCart.push({ ...product, quantity: product.quantity || 1 })
    }

    setCart(newCart)
    saveCartToFirebase(newCart)
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId)
    setCart(newCart)
    saveCartToFirebase(newCart)
  }

  const updateCartItem = (productId, quantity) => {
    const newCart = [...cart]
    const item = newCart.find(item => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        setCart(newCart.filter(item => item.id !== productId))
        saveCartToFirebase(newCart.filter(item => item.id !== productId))
      } else {
        item.quantity = quantity
        setCart(newCart)
        saveCartToFirebase(newCart)
      }
    }
  }

  const clearCart = () => {
    setCart([])
    saveCartToFirebase([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loadCartFromFirebase
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


