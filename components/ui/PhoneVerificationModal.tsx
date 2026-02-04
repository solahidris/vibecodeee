import { FormEvent, useState } from 'react'
import { Button } from './Button'

interface PhoneVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onSuccess: () => void
}

export function PhoneVerificationModal({
  isOpen,
  onClose,
  userId,
  onSuccess,
}: PhoneVerificationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setVerifying(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/profile/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify phone number')
      }

      setSuccess(true)
      setPhoneNumber('')

      // Wait 2 seconds before closing and refreshing
      setTimeout(() => {
        onSuccess()
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error('Phone verification error:', err)
      setError(err instanceof Error ? err.message : 'Failed to verify phone number')
    } finally {
      setVerifying(false)
    }
  }

  const handleClose = () => {
    if (!verifying) {
      setPhoneNumber('')
      setError(null)
      setSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Day 1 Supporter?
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            If you were super early and subscribed as one of our Day 1 supporters, please enter your phone number below to grant yourself full premium access.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="60123456789"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={verifying}
              required
              autoFocus
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Enter your Malaysian phone number starting with 60 (e.g., 60123456789)
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-green-700">
                Welcome back, Day 1 supporter! Your premium access has been activated.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleClose}
              disabled={verifying}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={verifying || !phoneNumber.trim()}
              className="flex-1"
            >
              {verifying ? 'Verifying...' : 'Verify & Activate'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
