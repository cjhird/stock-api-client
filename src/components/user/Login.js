import { Button, Form } from 'react-bootstrap'

const Login = () => {
  return (
    <div className="page-wrapper">
      <div className="login-form">
        <Form>
          <h3 className="form-title">Login</h3>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="form-btn">
            Login
          </Button>
          <Form.Text className="form-text">
            New to Stock Watch?{' '}
            <a id="form-login" href="/register">
              Register
            </a>
          </Form.Text>
        </Form>
      </div>
    </div>
  )
}

export default Login
