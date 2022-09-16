import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsOwner } from '../../helpers/auth'
import { Link } from 'react-router-dom'
import Comments from '../Comments'

import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Button } from 'react-bootstrap'

const ThreadDisplay = () => {
  const navigate = useNavigate()

  const [thread, setThread] = useState([])
  const { id } = useParams()
  const [boxDisplay, setBoxDisplay] = useState('ingredients')

  // Get a single thread
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/forum/${id}/`)
    console.log(data)
    setThread(data)
  }

  // Call the function GET a single recipe inside useEffect
  useEffect(() => {
    getData()
  }, [])

  // DELETE the thread
  const handleRemoveBtn = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/forum/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/threads')
    } catch (error) {
      console.log(error)
    }
  }

  const handleBoxBtn = (e) => {
    setBoxDisplay(e.target.value)
    console.log(boxDisplay)
  }

  // DELETE a comment
  const handleDeleteComment = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(
        `http://localhost:8000/api/comments/${e.target.value}/`,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="display-wrapper">
      {thread.owner ? (
        <div className="display-cont">
          <div className="display-title">
            <h1>
              {thread.name} - {thread.ticker}
            </h1>
            <div>
              {thread.owner.username && (
                <h3>Created by: {thread.owner.username}</h3>
              )}
              {userIsOwner(thread.owner) && (
                <div className="display-editdelete">
                  <Button variant="warning">
                    <a href={`/threads/${id}/update`}>Update</a>
                  </Button>

                  <Button variant="danger" onClick={handleRemoveBtn}>
                    <RiDeleteBin6Fill />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="display-show">
            <div className="display-content">
              <h4>Stock Sector:</h4>
              <p>{thread.stock_sector}</p>
            </div>
            <div className="display-content">
              <h4>Investment Thesis:</h4>
              <p>{thread.text}</p>
            </div>
            <div className="display-content">
              <h4>Rating:</h4>
              <p>{thread.stock_rating}</p>
            </div>
            <div className="display-content"></div>
          </div>
          <div className="display-comments">
            <Comments getData={getData} />
            <div className="comment-list">
              {thread.comments && thread.comments.length > 0 ? (
                thread.comments.map((item) => {
                  return (
                    <>
                      <div key={item.id} className="single-comment">
                        <h5>{item.owner.username}</h5>
                        <p>{item.created_at.slice(0, 10)}</p>
                        <p>{item.text}</p>
                        {userIsOwner(item.owner.id) && (
                          <Button value={item.id} onClick={handleDeleteComment}>
                            Delete
                          </Button>
                        )}
                        <hr />
                      </div>
                    </>
                  )
                })
              ) : (
                <h6>No comments yet!</h6>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h4>Not found!</h4>
      )}
    </div>
  )
}

export default ThreadDisplay
