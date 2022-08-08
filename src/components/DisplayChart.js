import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const DisplayChart = ({ chartData, symbol, handleChartScaleChange, chartScale }) => {


    // get x label functionality working with scale
    const { scale } = chartScale

    if (chartData == null) {
        return
    } else {
        const { prices } = chartData
        const yLabels = prices.map(arr => arr[1])
        const xLabels = prices.map(arr => {
            const date = new Date(arr[0])
            const hours = date.getHours()
            return `${hours}`

        })

        var data = {
            labels: xLabels,
            datasets: [
                {
                    label: `${symbol.toUpperCase()} / USD`,
                    data: yLabels,
                    borderColor: '#2f2fa2'
                }
            ]
        }
    }


    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }

    const handleClick = (scale) => {
        handleChartScaleChange(scale)
    }


    function getScaleLinks(currentScale) {
        const scales = [
            'yearly',
            'monthly',
            'weekly',
            'daily'
        ]

        const scaleNodes = scales.map((scale, index) => {
            if (currentScale === scale) {
                return <h3 key={index} onClick={() => handleClick(scale)} className={"selected-day"}>{scale}</h3>
            } else {
                return <h3 key={index} onClick={() => handleClick(scale)}>{scale}</h3>
            }
        })

        return scaleNodes
    }


    return (
        <div className='center'>
            <div className="chart-day-picker">
                {getScaleLinks(scale)}
            </div>
            <div className="display-chart">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default DisplayChart