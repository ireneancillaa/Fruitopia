import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../hooks/useAuthHook'

const Login = ({ onClose, switchToRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Set user data immediately from auth, fetch Firestore data in background
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || email.split('@')[0]
      }
      
      setUser(userData)
      onClose()

      // Fetch full user data from Firestore asynchronously (non-blocking)
      setTimeout(async () => {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid)
          const userDocSnapshot = await getDoc(userDocRef)
          
          if (userDocSnapshot.exists()) {
            const fullUserData = { ...userData, ...userDocSnapshot.data() }
            setUser(fullUserData)
          }
        } catch (err) {
          console.error('Error fetching user data:', err)
        }
      }, 0)
    } catch (err) {
      setError(err.message || 'Failed to login')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-[#007E6E] text-center mb-2">Welcome Back</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#007E6E]"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#007E6E]"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#007E6E] text-white rounded-md font-semibold text-base hover:bg-[#006456] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <button
            onClick={switchToRegister}
            className="text-[#007E6E] font-medium underline hover:no-underline"
            disabled={loading}
          >
            Sign up here
          </button>
        </p>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-200 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Login
