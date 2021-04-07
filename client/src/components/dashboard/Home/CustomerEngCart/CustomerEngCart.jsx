import React from 'react';
import './style.scss'
import { Line,Bar } from '@reactchartjs/react-chart.js';
 const data = {
    labels: ['Sat', 'Sun', 'Mon', 'Tus', 'Wes', 'Thus', 'Fri'],
    datasets: [{
        label: 'Customer Engagements',
        borderColor : '#39CCCC',
        backgroundColor : '#39CCCC',
        data: [
           4,5,6,7,8,9,40
        ],
        fill: false,
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
        <div className="customerengchart boxshadow">
            <div className="headerdb">
                Customer Engagements
            
            </div>
            <div className="canvas">
                <Bar data = {data} options={options}/>
            </div>
        </div>
    );
};

export default OrderSalesChart;