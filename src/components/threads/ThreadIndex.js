import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ThreadFilter from './ThreadFilter'

// Import icons
import { BsFilterRight } from 'react-icons/bs'
import { Button, Container, Table } from 'react-bootstrap'

const ThreadIndex = () => {
  const [threads, setThreads] = useState([])
  const [filtersSwitchBtn, setFiltersSwitchBtn] = useState(false)
  const [threadsFiltered, setThreadsFiltered] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    stockSector: '',
    stockRating: '',
  })

  // GET all the threads
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
    <div className="index-wrapper">
      <div className="page-cont">
        <div className="index-title">
          <h3>Forum Threads</h3>
        </div>
        <div className="index-search">
          <input
            name="search"
            type="text"
            placeholder="Search any thread"
            onChange={handleChange}
          ></input>
          <Button onClick={handleFiltersToggleBtn}>
            <BsFilterRight className="filters-button" />
          </Button>
        </div>
        {filtersSwitchBtn && (
          <ThreadFilter
            threads={threads}
            handleChange={handleChange}
            handleClearFiltersBtn={handleClearFiltersBtn}
          />
        )}
        <Container>
          <Table id="coin-title" hover variant="light" className="col-3 mb-0">
            <thead>
              <tr>
                <th className="col-1">Ticker</th>
                <th className="col-3 text-start">Stock</th>
                <th className="col-2 text-start">Sector</th>
                <th className="col-1 text-end">Rating</th>
                <th className="col-1 text-start">Owner Id</th>
              </tr>
            </thead>
          </Table>
          <Table hover variant="light" className="col-3 mb-0">
            <tbody>
              {threadsFiltered.map((item) => {
                const { name, ticker, id, stock_sector, stock_rating, owner } =
                  item
                return (
                  <tr key={id} className="mb-5 mt-5">
                    <td className="col-1">
                      <a href={`/threads/${id}`}>{ticker}</a>
                    </td>
                    <td className="col-3 text-start">
                      <a href={`/threads/${id}`}>{name}</a>
                    </td>
                    <td className="col-2 text-start">
                      <a href={`/threads/${id}`}>{stock_sector}</a>
                    </td>
                    <td className="col-1 text-end">
                      <a href={`/threads/${id}`}>{stock_rating}</a>
                    </td>
                    <td className="col-1 text-center">
                      <a href={`/threads/${id}`}>{owner}</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  )
}

export default ThreadIndex
