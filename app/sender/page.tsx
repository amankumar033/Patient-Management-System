// components/EmailForm.tsx
'use client'
import { useState } from 'react'


export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

      async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const response = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle the response
        if (response.ok) {
          const data = await response.json();
          setStatus(`Email sent successfully: ${data.message}`);
        } else {
          const error = await response.json();
          setStatus(`Error sending email: ${error.message}`);
        }
      }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Email</button>
      <p>{status}</p>
    </form>
  )
}
