import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const EachCrypto = ({ id, symbol, name, image, market_cap_rank, current_price, handleCryptoClick, isFavourite, handleFavourite }) => {

    const handleClick = () => {
        handleCryptoClick(id)
    }

    const handleStarClick = (id) => {
        handleFavourite(id)
    }

    return (
        <div className="crypto" onClick={handleClick}>
            <h2>{market_cap_rank}.</h2>
            <h1>{name}</h1>
            <h3>$ {current_price} / {symbol.toUpperCase()}</h3>
            <img src={image} alt="crypto-icon" className='crypto-icon-small' />
            {/* <h3>{price}</h3> */}
            {isFavourite ? <button onClick={() => handleStarClick(id)}><FontAwesomeIcon icon={faStar} spin /></button> : <button onClick={() => handleStarClick(id)}><FontAwesomeIcon icon={faStar} /></button>}
            {/* <h3><FontAwesomeIcon icon='fa-regular fa-star' /></h3> */}
        </div>
    )
}

export default EachCrypto