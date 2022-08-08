import React from 'react'
import Favourite from './Favourite'

const Display = ({ cryptos }) => {


    const favouriteNodes = cryptos.map((crypto) => {
        if (crypto.isFavourite) {
            return <Favourite crypto={crypto} />
        }
    })


    return (
        <div className='display-headers'>
            <h1>Favourites</h1>
            <div className="favourite-list">
                {favouriteNodes}
            </div>
        </div>

    )
}

export default Display