import React from 'react'

export default function Footer() {
  return (
    <>
        <footer style={{display : "flex", justifyContent : "center", alignItems : "center", height : "5vh"}}>
            <h4>
              Jose David Ramirez Mogotocoro -<span> Copyright © {new Date().getFullYear()}</span>
            </h4>
        </footer>
    </>
  )
}
