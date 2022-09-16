import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ThreadFilter from './ThreadFilter'

// Import icons
import { BsFilterRight } from 'react-icons/bs'
import { Table } from 'react-bootstrap'

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
      <Table id="coin-title" hover variant="light" className="col-3 mb-0">
        <thead>
          <tr>
            <th className="col-1">Ticker</th>
            <th className="col-3 text-start">Stock</th>
            <th className="col-3 text-end">Sector</th>
            <th className="col-1 text-end">Rating</th>
            <th className="col-3 text-start">Owner</th>
          </tr>
        </thead>
      </Table>
      <Table hover variant="light" className="col-3 mb-0">
        <tbody>
          {threadsFiltered.map((item) => {
            const { name, ticker, id, stock_sector, stock_rating, owner } = item
            return (
              <tr key={id} className="mb-5 mt-5">
                {/* <Link to={`/threads/${id}`}> */}
                <td className="col-1">{ticker}</td>
                <td className="col-3 text-start">{name}</td>
                <td className="col-3 text-end">{stock_sector}</td>
                <td className="col-1 text-end">{stock_rating}</td>
                <td className="col-1 text-start">{owner}</td>
                {/* </Link> */}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default ThreadIndex
