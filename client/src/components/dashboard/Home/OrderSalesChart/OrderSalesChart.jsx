import React from 'react';
import './Style.scss'
import { Line,Bar } from '@reactchartjs/react-chart.js';
 const data = {
    labels: ['Sat', 'Sun', 'Mon', 'Tus', 'Wes', 'Thus', 'Fri'],
    datasets: [{
        label: 'Orders',
        borderColor : '#B10DC9',
        backgroundColor : '#B10DC9',
        data: [
           4,5,6,7,8,9,40
        ],
        fill: false,
    }, {
        label: 'Sales',
        fill: false,
        borderColor : '#0074D9',
        backgroundColor : '#0074D9',


    
        data: [
            10,2,3,6,4,9,1
        ],
    }]
}
const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
const OrderSalesChart = () => {
    return (
        <div className="ordersaleschart boxshadow">
            <div className="headerdb">
                Orders and Sales
            
            </div>
            <div className="canvas">
                <Line data = {data} options={options}/>
            </div>
        </div>
    );
};

export default OrderSalesChart;