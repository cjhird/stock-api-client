import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <main className="landing-wrapper">
      <div>
        <h2>The No.1 Stock Discussion Board!</h2>
        <Link to={'/threads'}>Start</Link>
      </div>
    </main>
  )
}
export default Landing
