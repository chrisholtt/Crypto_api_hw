import React from 'react'
import Display from './Display'
import DisplayChart from './DisplayChart'
import SearchResult from './SearchResult'

const DisplayBox = ({ searchResult, closeResult, chartData, handleChartScaleChange, chartScale, cryptos }) => {

    const { show, symbol } = searchResult

    return (
        <div className="center">
            <div className='display-box'>
                {show ? <SearchResult searchResult={searchResult} closeResult={closeResult} /> : <Display cryptos={cryptos} />}
            </div>
            {show && <DisplayChart chartData={chartData} symbol={symbol} handleChartScaleChange={handleChartScaleChange} chartScale={chartScale} />}
        </div>
    )
}

export default DisplayBox