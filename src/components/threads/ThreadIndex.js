import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ThreadFilter from './ThreadFilter'

// Import icons
import { BsFilterRight } from 'react-icons/bs'

const ThreadIndex = () => {
  const [threads, setThreads] = useState([])
  const [filtersSwitchBtn, setFiltersSwitchBtn] = useState(false)
  const [threadsFiltered, setThreadsFiltered] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    stockSector: '',
    stockRating: '',
  })

  // GET all the recipes
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/forum/')
        console.log('GET all data --->', data)
        setThreads(data)
      } catch (err) {
        console.log(err.response.data.detail)
      }
    }
    getData()
  }, [])

  const handleFiltersToggleBtn = () => {
    filtersSwitchBtn === false
      ? setFiltersSwitchBtn(true)
      : setFiltersSwitchBtn(false)
    console.log(filtersSwitchBtn)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    const newObj = {
      ...filters,
      [e.target.name]: e.target.value,
    }
    setFilters(newObj)
    // console.log(filters)
  }

  useEffect(() => {
    const filtered = threads.filter((item) => {
      return (
        item.name.toLowerCase().startsWith(filters.search) &&
        (filters.stockRating === item.stock_rating ||
          filters.stockRating === '') &&
        (filters.stockSector === item.stock_sector ||
          filters.stockSector === '')
      )
    })
    setThreadsFiltered(filtered)
  }, [threads, filters])

  const handleClearFiltersBtn = () => {
    setFilters({
      search: '',
      stockSector: '',
      stockRating: '',
    })
  }

  return (
    <div className="recipes-index-page">
      <div className="search-bar-and-filters-btn">
        <input
          name="search"
          type="text"
          placeholder="Search by name"
          onChange={handleChange}
        ></input>
        <button onClick={handleFiltersToggleBtn}>
          <BsFilterRight className="filters-button" />
        </button>
      </div>
      {filtersSwitchBtn && (
        <ThreadFilter
          threads={threads}
          handleChange={handleChange}
          handleClearFiltersBtn={handleClearFiltersBtn}
        />
      )}
      <div className="index-recipes-list">
        {threadsFiltered.map((item) => {
          const { name, ticker, id, stock_rating, image } = item
          return (
            <div key={id} className="index-recipe-card">
              <Link to={`/threads/${id}`}>
                <div className="index-card-image">
                  <img src={image} />
                </div>
                <div className="index-card-body">
                  <h4>{name}</h4>
                  <h4>{ticker}</h4>
                  <h4>{stock_rating}</h4>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ThreadIndex
