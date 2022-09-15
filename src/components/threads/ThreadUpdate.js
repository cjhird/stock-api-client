import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUpload from '../ImageUpload'
import { getPayload, getTokenFromLocalStorage } from '../../helpers/auth'

const ThreadUpdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [thread, setThread] = useState()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    stock_sector: '',
    text: '',
    stock_rating: '',
    image: '',
    owner: '',
  })

  // GET the single thread
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/forum/${id}/`)
      setFormData(data)
      setLoading(false)
    }
    getData()
  }, [setFormData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitBtn = async (e) => {
    e.preventDefault()
    const payload = getPayload()
    formData.owner = payload.sub

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/forum/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      navigate(`/threads/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <span>Loading</span>
  }

  return (
    <section className="edit-recipe">
      <form onSubmit={handleSubmitBtn}>
        <label htmlFor="name">Stock Name</label>
        <input
          type="text"
          name="name"
          className="add-page-title"
          value={formData.name}
          onChange={handleChange}
        ></input>

        <label htmlFor="ticker">Ticker</label>
        <textarea
          name="ticker"
          value={formData.ticker}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="cook-time">Stock Sector</label>
        <select
          name="stock_sector"
          value={formData.stock_sector}
          onChange={handleChange}
        >
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Financial">Financial</option>
          <option value="Communication">Communication</option>
          <option value="Energy">Energy</option>
          <option value="Utilities">Utilities</option>
          <option value="Property">Property</option>
          <option value="Materials">Materials</option>
          <option value="Consumer">Consumer</option>
        </select>

        <label htmlFor="text">Thesis</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="stock_rating">Stock Rating</label>
        <select
          name="stock_rating"
          value={formData.stock_rating}
          onChange={handleChange}
        >
          <option value="Sell">Sell</option>
          <option value="Underperform">Underperform</option>
          <option value="Hold">Hold</option>
          <option value="Outperform">Outperform</option>
          <option value="Buy">Buy</option>
        </select>

        <label htmlFor="image">Image</label>
        <ImageUpload
          formData={formData}
          setFormData={setFormData}
          value={formData.image}
        />

        <button className="edit-recipe-btn" type="submit">
          Update Thread
        </button>
      </form>
    </section>
  )
}

export default ThreadUpdate
