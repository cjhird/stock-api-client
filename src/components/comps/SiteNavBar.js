// Import Link
import { Link } from 'react-router-dom'

// Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'

const SiteNavBar = () => {
  // ! JSX
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container as="section" className="nav justify-content-center">
        {/* Navbar brand */}
        {/* Wherever you use a href on a bootstrap component, replace it with an as={Link} and a to="/pathname" */}
        <Navbar.Brand as={Link} to="/">
          STOCK WATCH
        </Navbar.Brand>
        {/* Navbar Toggle is our mobile burger icon - this is displayed at a breakpoint specified on the Navbar component above */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar collapse is our menu wrapped in a collapsible container for mobile */}
        <Navbar.Collapse id="basic-navbar-nav" className="">
          {/* Nav Link is an individual link inside a nav. Same as Nav Brand, to use Link add as={Link} and to="/pathname" */}
          <Nav.Link as={Link} to="/screener" className="ms-5 text-light">
            Screener
          </Nav.Link>
          <Nav.Link as={Link} to="/portfolio" className="ms-5 text-light">
            Portfolio
          </Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" className="ms-5 text-light">
            Leaderboard
          </Nav.Link>
          <Nav.Link as={Link} to="/register" className="ms-5">
            <Button variant="light">Register</Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="">
            <Button variant="primary">Login</Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNavBar
