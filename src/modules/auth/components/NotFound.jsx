import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Not Found</h1>
      <button value="login" onClick={() => {
            navigate(-1)
            }}>
            Volver
      </button>
    </div>

  )
}