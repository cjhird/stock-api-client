import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmitBtn = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8000/api/auth/register/', formData)
      console.log(formData)
      navigate('/login')
    } catch (err) {
      console.log(err)
      console.log(err.response.data.errors)
      setErrors(err.response.data.errors)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-form">
        <Form onSubmit={handleSubmitBtn}>
          <h3 className="form-title">Register</h3>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
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
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
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
