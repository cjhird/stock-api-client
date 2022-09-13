import axios from 'axios'
import { useState, useEffect } from 'react'

const Landing = () => {
  const [stockData, setStockData] = useState([])
  const [error, setError] = useState('')

  // ! PULL STOCK PRICE DATA FROM THIRD-PARTY API
  // https://eodhistoricaldata.com/api/real-time/AAPL.US?api_token=demo&fmt=json&s=MSFT.US,AMZN.US,TSLA.US

  // ! PULL STATIC STOCK DATA FROM DJANGO API
  // http://localhost:8000/stocks/
  useEffect(() => {
    const getStockData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/stocks/')
        setStockData(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getStockData()
  }, [])

  return (
    <div className="landing-wrapper">
      <h1>Landing Page</h1>
    </div>
  )
}

export default Landing
