import React from 'react'

const Favourite = ({ crypto }) => {
    const { id, name, symbol, image, current_price, price_change_percentage_24h, circulating_supply, } = crypto

    return (
        <div className='favourite'>

            <div>
                <img src={image} alt="" className='crypto-icon-small' />
            </div>

            <div>
                <h1>{name}</h1>
                <h1>{symbol}</h1>
            </div>

            <div>
                <h2>${current_price}</h2>
                <h2>{price_change_percentage_24h}</h2>

            </div>

        </div>
    )
}

export default Favourite