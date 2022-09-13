import { Button, Form } from 'react-bootstrap'

const Register = () => {
  return (
    <div className="page-wrapper">
      <div className="register-form">
        <Form>
          <h3 className="form-title">Register</h3>
          <Form.Group className="mb-3">
            <Form.Label>Forename</Form.Label>
            <Form.Control type="text" placeholder="Forename" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Surname" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="form-btn">
            Register
          </Button>
          <Form.Text className="form-text">
            Already have an account?{' '}
            <a id="form-login" href="/login">
              Login
            </a>
          </Form.Text>
        </Form>
      </div>
    </div>
  )
}

export default Register
