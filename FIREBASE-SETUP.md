# Firebase Setup & Integration Guide

## What's Been Set Up

### Authentication System
- **Firebase Authentication**: Email/password sign-up and login
- **Error Handling**: Validation for password length (min 6 chars), password confirmation, and Firebase error messages
- **User Profiles**: Automatically creates user documents in Firestore with profile info

### Files Updated/Created

#### 1. **`src/components/Login.jsx`** ✅
Firebase-integrated login modal with:
- Email/password authentication using `signInWithEmailAndPassword()`
- Fetches user profile from Firestore `users` collection
- Error display and loading states
- Disabled inputs during submission
- Switch to register functionality

#### 2. **`src/components/Register.jsx`** ✅
Firebase-integrated registration modal with:
- Account creation using `createUserWithEmailAndPassword()`
- Profile update with display name
- Automatic Firestore user document creation with cart array
- Password validation (min 6 chars, match confirmation)
- Error messages for all validation cases

#### 3. **`src/hooks/useAuth.js`** ✅
Updated to include:
- `setUser` method for manual user state updates
- Firebase `onAuthStateChanged()` listener for persistent login
- `logout()` function that clears auth state
- Error throwing if used outside `AuthProvider`

#### 4. **`src/context/CartContext.jsx`** ✅ (NEW)
Complete cart management system that:
- Loads cart from Firebase on user login
- Saves cart to Firestore `users/{uid}/cart` array
- Methods: `addToCart()`, `removeFromCart()`, `updateCartItem()`, `clearCart()`
- Utilities: `getTotalPrice()`, `getTotalItems()`
- Syncs to Firebase automatically on every cart change

#### 5. **`src/App.jsx`** ✅
Wrapped with both providers:
- `AuthProvider` for authentication
- `CartProvider` for cart management

## Firestore Structure

```
users/
  {uid}/
    - uid: string
    - email: string
    - name: string
    - createdAt: ISO timestamp
    - cart: [
        {
          id: string,
          name: string,
          price: number,
          quantity: number,
          ...otherProductFields
        }
      ]
```

## Using the Cart

### In Components:
```jsx
import { useCart } from '../context/CartContext'

const MyComponent = () => {
  const { cart, addToCart, removeFromCart, getTotalPrice } = useCart()
  
  // Add to cart
  addToCart({ id: '1', name: 'Apple', price: 10, quantity: 2 })
  
  // Remove from cart
  removeFromCart('1')
  
  // Get total
  console.log(getTotalPrice())
}
```

## Testing Checklist

- [ ] Run `npm install` to ensure firebase is installed
- [ ] Start dev server: `npm run dev`
- [ ] Test register flow: create new account, check Firestore for new user doc
- [ ] Test login flow: login with existing account, profile loads from Firestore
- [ ] Test cart: add items to cart, logout/login, cart persists
- [ ] Test error cases: invalid password, email already exists, etc.

## Firebase Configuration

Your Firebase config is in `src/firebase.js`:
- Project: `fruitopia-8cc29`
- Auth: Email/Password enabled
- Firestore: Ensure rules allow authenticated users to read/write their own data

## Important Notes

1. **Firestore Rules**: Make sure your Firestore security rules allow authenticated users to modify their own documents:
```
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
```

2. **Cart Persistence**: Cart is automatically saved to Firestore on every change. No manual save needed.

3. **Error Handling**: All components display Firebase error messages. Common errors:
   - "Firebase: Error (auth/email-already-in-use)"
   - "Firebase: Error (auth/user-not-found)"
   - "Firebase: Error (auth/wrong-password)"

4. **Performance**: Consider adding indexes in Firestore if querying multiple users' data in the future.
