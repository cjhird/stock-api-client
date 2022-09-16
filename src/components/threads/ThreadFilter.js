import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const ThreadFilter = ({ threads, handleChange, handleClearFiltersBtn }) => {
  const [stockRatingList, setStockRatingList] = useState([])
  const [stockSectorList, setStockSectorList] = useState([])

  useEffect(() => {
    // Generate the "Stock Rating" buttons list
    const arrOne = []
    threads.map((item) => {
      if (!arrOne.includes(item.stock_rating)) {
        arrOne.push(item.stock_rating)
      }
    })
    setStockRatingList(arrOne)

    // Generate the "Stock Sector" buttons list
    const arrTwo = []
    threads.map((item) => {
      if (!arrTwo.includes(item.stock_sector)) {
        arrTwo.push(item.stock_sector)
      }
    })
    setStockSectorList(arrTwo)
  }, [threads])

  return (
    <section className="filters-wrapper">
      <div className="filters-cont">
        <div className="stock-sector-cont">
          <h4>Stock Sectors</h4>
          {stockSectorList.map((item, index) => {
            return (
              <Button
                name="stockSector"
                className={`${item}-btn`}
                key={index}
                value={item}
                onClick={handleChange}
              >
                {item}
              </Button>
            )
          })}
        </div>
        <hr />
        <div className="stock-rating-cont">
          <h4>Stock Rating</h4>
          {stockRatingList.map((item, index) => {
            return (
              <Button
                name="stockRating"
                className={`stock-rating ${item}-btn`}
                key={index}
                value={item}
                onClick={handleChange}
              >
                {item}
              </Button>
            )
          })}
        </div>
        <Button className="clear-filters" onClick={handleClearFiltersBtn}>
          Clear filters
        </Button>
      </div>
    </section>
  )
}

export default ThreadFilter
