import React, { useEffect, useState } from 'react'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Comments = ({ getData }) => {
  const { id } = useParams()

  const [comment, setComment] = useState({
    text: '',
    thread: id,
  })

  const handleChange = (e) => {
    setComment({ ...comment, text: e.target.value })
    console.log(comment)
  }

  // POST a comment
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/comments/', comment, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h4>Thread Comments</h4>
      {userIsAuthenticated() ? (
        <form onSubmit={handleSubmitComment}>
          <textarea
            name="comment"
            placeholder="Type your comment"
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="no-auth-comments">
          <p>
            <Link to={'/login'}>Login</Link> to leave a comment <br /> or{' '}
            <Link to={'/register'}>Sign up</Link>
          </p>
        </div>
      )}
    </>
  )
}

export default Comments
