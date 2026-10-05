import { useState, useEffect } from 'react'
import { FREE_SHIPPING_THRESHOLD, PINCODE_STORAGE_KEY } from '../constants'

interface PincodeCheckerProps {
  onPincodeChange?: (pincode: string, isServiceable: boolean) => void
}

export function PincodeChecker({ onPincodeChange }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState(() => {
    try {
      return localStorage.getItem(PINCODE_STORAGE_KEY) || '671121'
    } catch {
      return '671121'
    }
  })

  const [status, setStatus] = useState<'idle' | 'checking' | 'serviceable' | 'unserviceable' | 'invalid'>('idle')
  const [deliveryEstimate, setDeliveryEstimate] = useState<string>('')

  const checkPincode = (code: string) => {
    const clean = code.trim().replace(/\D/g, '')
    if (clean.length !== 6) {
      setStatus('invalid')
      onPincodeChange?.(clean, false)
      return
    }

    setStatus('checking')

    setTimeout(() => {
      // Valid Indian 6-digit pincode check
      if (clean.startsWith('0') || clean === '999999') {
        setStatus('unserviceable')
        onPincodeChange?.(clean, false)
      } else {
        // Calculate estimated delivery: 3 to 4 business days
        const targetDate = new Date()
        targetDate.setDate(targetDate.getDate() + 3)
        const dateStr = targetDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })

        setDeliveryEstimate(dateStr)
        setStatus('serviceable')
        try {
          localStorage.setItem(PINCODE_STORAGE_KEY, clean)
        } catch {
          // ignore
        }
        onPincodeChange?.(clean, true)
      }
    }, 350)
  }

  // Initial check on mount
  useEffect(() => {
    if (pincode && pincode.length === 6) {
      checkPincode(pincode)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkPincode(pincode)
  }

  return (
    <div className="pincode-checker-box">
      <div className="pincode-checker__head">
        <span className="pincode-checker__title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Delivery &amp; Courier Serviceability
        </span>
      </div>

      <form onSubmit={handleSubmit} className="pincode-checker__form">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN code"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '')
            setPincode(val)
            if (val.length !== 6) {
              setStatus('idle')
            }
          }}
          className="pincode-checker__input"
        />
        <button
          type="submit"
          className="pincode-checker__btn"
          disabled={status === 'checking'}
        >
          {status === 'checking' ? 'Checking...' : 'Check'}
        </button>
      </form>

      {/* Result feedback */}
      {status === 'serviceable' && (
        <div className="pincode-checker__result pincode-checker__result--success">
          <div className="result-icon">✓</div>
          <div className="result-text">
            <p><strong>Express Delivery by {deliveryEstimate}</strong> to PIN {pincode}</p>
            <span className="result-sub">
              Free courier on orders over ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')} • Cash on Delivery &amp; UPI available
            </span>
          </div>
        </div>
      )}

      {status === 'unserviceable' && (
        <div className="pincode-checker__result pincode-checker__result--error">
          <div className="result-icon">!</div>
          <div className="result-text">
            <p>Standard delivery currently unavailable for PIN {pincode}</p>
            <span className="result-sub">
              Please contact our Kerala studio at prastharaventures@gmail.com for remote India Post parcel arrangements.
            </span>
          </div>
        </div>
      )}

      {status === 'invalid' && (
        <div className="pincode-checker__result pincode-checker__result--warning">
          <div className="result-icon">i</div>
          <div className="result-text">
            <p>Please enter a valid 6-digit Indian PIN code (e.g. 560001, 671121, 110001).</p>
          </div>
        </div>
      )}
    </div>
  )
}
