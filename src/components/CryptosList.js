import React from 'react'
import EachCrypto from './EachCrypto'

const CryptosList = ({ cryptos, handleCryptoClick, handleFavourite }) => {


    const cryptoNodes = cryptos.map((crypto, index) => {
        return (
            <EachCrypto key={index} id={crypto.id} symbol={crypto.symbol} name={crypto.name} image={crypto.image} market_cap_rank={crypto.market_cap_rank} current_price={crypto.current_price} handleCryptoClick={handleCryptoClick} isFavourite={crypto.isFavourite} handleFavourite={handleFavourite} />
        )
    })

    return (
        <>
            <div className="center">
                <div className='cryptos'>
                    <hr />
                    <div className="subheading">
                        <h3>Top {cryptos.length} cryptocurrencies</h3>
                        <h3>/ USD</h3>
                    </div>
                    <hr />
                    {cryptoNodes}
                </div>
            </div>
        </>
    )
}

export default CryptosList