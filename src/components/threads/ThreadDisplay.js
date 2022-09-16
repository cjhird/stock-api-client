import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsOwner } from '../../helpers/auth'
import { Link } from 'react-router-dom'
import Comments from '../Comments'

// Import icons
import { FaUserAlt } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { MdOutlineModeEditOutline } from 'react-icons/md'

const ThreadDisplay = () => {
  const navigate = useNavigate()

  const [thread, setThread] = useState([])
  const { id } = useParams()
  const [boxDisplay, setBoxDisplay] = useState('ingredients')

  // Get a single recipe
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/forum/${id}/`)
    console.log(data)
    setThread(data)
  }

  // Call the function GET a single recipe inside useEffect
  useEffect(() => {
    getData()
  }, [])

  // DELETE the recipe
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
    <>
      {thread.owner ? (
        <>
          <header>
            <h1>
              {thread.name} - {thread.ticker}
            </h1>
            <div>
              {thread.owner.username && (
                <h3>
                  <FaUserAlt className="header-user-icon" />{' '}
                  {thread.owner.username}
                </h3>
              )}
              {userIsOwner(thread.owner) && (
                <div>
                  <Link to={`/threads/${id}/update`}>
                    <MdOutlineModeEditOutline />
                  </Link>
                  <button onClick={handleRemoveBtn}>
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              )}
            </div>
          </header>
          <section className="recipe-show">
            <div className="image-wrapper">
              <div>
                <img src={thread.image} />
              </div>
            </div>
            <div>
              <h2>{thread.stock_sector}</h2>
              <h2>{thread.text}</h2>
              <h2>{thread.stock_rating}</h2>
            </div>
          </section>
          <section className="comments-section">
            <Comments getData={getData} />
            <div className="comment-list">
              {thread.comments && thread.comments.length > 0 ? (
                thread.comments.map((item) => {
                  return (
                    <>
                      <div key={item.id} className="single-comment">
                        <h5>
                          <FaUserAlt className="comments-user-icon" />{' '}
                          {item.owner.username}
                        </h5>
                        <p>{item.created_at.slice(0, 10)}</p>
                        <p>{item.text}</p>
                        {userIsOwner(item.owner.id) && (
                          <button value={item.id} onClick={handleDeleteComment}>
                            Delete
                          </button>
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
          </section>
        </>
      ) : (
        <h4>Not found!</h4>
      )}
    </>
  )
}

export default ThreadDisplay
