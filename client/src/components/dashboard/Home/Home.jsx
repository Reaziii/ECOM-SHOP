import React from 'react';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import Nav from '../DashNav/Nav';
import BasicDetails from './BasicDetails/BasicDetails';
import CustomerEngCart from './CustomerEngCart/CustomerEngCart';
import './Home.scss'
import OrderSalesChart from './OrderSalesChart/OrderSalesChart';
import Summery from './Summery/Summery';
const Home = () => {
    return (
        <div><Nav/>
        <div className="dash-home containers">
            <BasicDetails/>
            <Summery/>
            <div className="thrdsec">
                <OrderSalesChart/>
                <CustomerEngCart/>

            </div>
        </div>
        </div>
    );
};

export default Home;