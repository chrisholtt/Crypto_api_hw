import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SearchResult = ({ searchResult, closeResult }) => {

    const { id, symbol, name, image, current_price, market_cap, market_cap_rank, total_volume, circulating_supply, price_change_percentage_24h } = searchResult

    const priceChangeNode = (priceChangeVal) => {
        if (priceChangeVal >= 0) {
            return <h3 className='green'>Price change:  {`+${priceChangeVal}`}%</h3>

        } else {
            return <h3 className='red'>Price change: {priceChangeVal}%</h3>

        }
    }

    const handleClick = () => {
        closeResult()
    }

    return (
        <div className='search-result-wrapper'>
            <button onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            <div className='search-results-top'>
                <h2>No. {market_cap_rank} </h2>
                <h2>{name}</h2>
                <h2> / {symbol.toUpperCase()}</h2>
                <h2>${current_price}</h2>
            </div>


            <div>
                <h3>Market Cap: ${market_cap}</h3>
                <h3>24hr volume: ${total_volume}</h3>
                <h3>Circulating supply: {circulating_supply}</h3>
                {priceChangeNode(price_change_percentage_24h)}
                <a href={`https://www.coingecko.com/en/coins/${id}`} style={{ color: 'black' }} target='_blank'>View on coingecko</a>

            </div>

            <div>
                <img src={image} alt="crypto-icon" className='crypto-icon-large' />
            </div>

        </div>

    )
}

export default SearchResult