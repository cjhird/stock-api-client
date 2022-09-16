import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Landing = () => {
  return (
    <main className="page-wrapper">
      <div className="landing-cont">
        <h1>Welcome to the Stock Forum!</h1>
        <h4>
          The No.1 place for investment research and discussion on the internet!{' '}
          <br />
          Access user generated investment thesise on all the top stocks.
        </h4>
        <div className="landing-btn">
          <Link as={Link} to="/threads/">
            <Button>Discover Now</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
export default Landing
