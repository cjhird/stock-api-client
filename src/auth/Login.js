import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('stock-forum', token)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmitBtn = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/auth/login/',
        formData
      )
      setTokenToLocalStorage(data.token)
      navigate('/threads')
      console.log('data token --->', data)
    } catch (err) {
      console.log(err)
      console.log(err.response.data.errors)
      setErrors(err.response.data.errors)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <Form onSubmit={handleSubmitBtn}>
          <h3 className="form-title">Login</h3>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="form-btn">
            Login
          </Button>
          <Form.Text className="form-text">
            New to Stock Forum?{' '}
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
