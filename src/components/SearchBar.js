import React, { useState } from 'react'

const SearchBar = ({ handleSearch, clickSearch }) => {


    const handleChange = (e) => {
        const { value } = e.target
        handleSearch(value)
    }

    return (
        <>
            <div className="center">
                <div>
                    <input type="text" placeholder='Enter ticker symbol' onChange={handleChange} className='search-bar' />
                </div>
            </div>
        </>
    )
}

export default SearchBar