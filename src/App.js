import './App.css';
import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import Navbar from './components/Navbar'
import DisplayBox from './components/DisplayBox'
import CryptosList from './components/CryptosList';

function App() {

  const [favourites, setFavourites] = useState([])

  const [cryptos, setCryptos] = useState(null)
  const [search, setSearch] = useState('bitcoin')
  const [searchResult, setSearchResult] = useState({ symbol: '', price: '', show: false })

  const [chartData, setChartData] = useState(null)

  const [chartScale, setChartScale] = useState({
    scale: 'daily',
    currentTime: '',
    targetTime: ''
  })



  // Get all crypto pairs
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => res.json())
      // .then(data => setCryptos(data))
      .then(data => setCryptos(addIsFavouriteKeys(data)))
  }, [])


  // Add isFavourite ket to all cryptos
  const addIsFavouriteKeys = (data) => {
    const updatedData = data.map(crypto => {
      return { ...crypto, isFavourite: false }
    })
    return updatedData
  }



  // Search state
  const handleSearch = (ticker) => {
    // check to see if ticker in is state
    const crypto = cryptos.filter(crypto => crypto.symbol === ticker.toLowerCase())

    if (crypto.length) {
      const result = crypto[0]
      result.show = true
      setSearchResult(result)

      // Get ID from ticker in search bar to put id into search state
      const idFromTicker = crypto.filter(crypto => crypto.symbol === ticker)[0].id
      console.log(idFromTicker)
      setSearch(idFromTicker)
    } else {
      setSearchResult((prev) => {
        return { ...prev, show: false }
      })
    }
  }

  // Uer clicks on a crypto:
  const handleCryptoClick = (id) => {
    window.scrollTo(0, 0)
    setSearch(id)
    fetchChartData(id)
  }

  const fetchChartData = (id) => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`
    fetch(url)
      .then(res => res.json())
      .then(data => setChartData(data))
  }


  // On search change find the result:
  useEffect(() => {
    if (cryptos == null) {
      return
    }
    else if (cryptos.length) {
      const coinId = search
      const result = cryptos.filter(crypto => crypto.id === coinId)[0]
      result.show = true
      setSearchResult(result)
      fetchChartData(coinId)
    }
  }, [search])


  const handleChartScaleChange = (scale) => {
    // Turning 'weekly/ daily' values into epoch values:
    const currentTime = new Date();
    const currentSeconds = currentTime / 1000

    let targetTime = null;

    if (scale === 'yearly') {
      targetTime = currentSeconds - (60 * 60 * 24 * 365)
    } else if (scale === 'monthly') {
      targetTime = currentSeconds - (60 * 60 * 24 * 30)
    } else if (scale === 'weekly') {
      targetTime = currentSeconds - (60 * 60 * 24 * 7)
    } else if (scale === 'daily') {
      targetTime = currentSeconds - (60 * 60 * 24 * 1)
    }

    setChartScale({
      scale: scale,
      currentTime: currentSeconds,
      targetTime: targetTime
    })
  }

  // When chart scale changes make new fetch:
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${search}/market_chart/range?vs_currency=usd&from=${chartScale.targetTime}&to=${chartScale.currentTime}`
    fetch(url)
      .then(res => res.json())
      .then(data => setChartData(data))

  }, [chartScale])





  // Close search result btn:
  const closeResult = () => {
    setSearchResult((prev) => {
      return { ...prev, show: false }
    })
  }

  // handle Favourites:
  const handleFavourites = (pair) => {
    setFavourites(((prev) => {
      return [...prev, pair]
    }))
  }

  // Add crypto to favourite:

  const handleFavourite = (id) => {
    // const cryptoToFav = cryptos.filter(crypto => crypto.id == id)
    const copyArr = [...cryptos]
    copyArr.map((crypto) => {
      if (crypto.id == id) {
        crypto.isFavourite = !crypto.isFavourite
      }
    })
  }


  return (
    <div className="app">
      <Navbar />
      {cryptos && <DisplayBox searchResult={searchResult} closeResult={closeResult} chartData={chartData} handleChartScaleChange={handleChartScaleChange} chartScale={chartScale} cryptos={cryptos} />}
      <SearchBar handleSearch={handleSearch} />
      {cryptos && <CryptosList cryptos={cryptos} handleCryptoClick={handleCryptoClick} handleFavourite={handleFavourite} />}
    </div>
  );
}

export default App;
