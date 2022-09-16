import React, { useEffect, useState } from 'react'

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
      <div className="time-cook-section">
        <h4>Stock Sectors</h4>
        {stockSectorList.map((item, index) => {
          return (
            <button
              name="stockSector"
              className={`${item}-btn`}
              key={index}
              value={item}
              onClick={handleChange}
            >
              {item}
            </button>
          )
        })}
      </div>
      <hr />
      <div className="main-ingredient-section">
        <h4>Stock Rating</h4>
        {stockRatingList.map((item, index) => {
          return (
            <button
              name="stockRating"
              className={`stock-rating ${item}-btn`}
              key={index}
              value={item}
              onClick={handleChange}
            >
              {item}
            </button>
          )
        })}
      </div>
      <button className="clear-filters" onClick={handleClearFiltersBtn}>
        Clear filters
      </button>
    </section>
  )
}

export default ThreadFilter
