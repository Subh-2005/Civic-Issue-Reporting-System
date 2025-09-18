// Frontend API for OTP requests and verification

// Request OTP for email or phone
export async function requestOtp(identifier: string, isPhone = false) {
  const body = isPhone ? { phone: identifier } : { email: identifier };
  const res = await fetch('http://localhost:4000/api/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

// Verify OTP for email or phone
export async function verifyOtp(identifier: string, otp: string) {
  const res = await fetch('http://localhost:4000/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, otp }),
  });
  return res.json();
}
