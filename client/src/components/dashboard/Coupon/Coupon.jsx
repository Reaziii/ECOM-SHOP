import React, { useEffect, useState } from 'react';
import Nav from '../DashNav/Nav';
import AllCoupons from './AllCoupon/AllCoupons';
import CreateNew from './CreateNew/CreateNew';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {middatechecker} from '../../../utils/aboutdate'
import './style.scss'
import axios from 'axios';
const Coupon = () => {
    const [Coupons,setCoupons] = useState([]);
    const getcoupons = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/coupon').then(res=>{
            setCoupons([...res.data]);
        }).catch(err=>console.log(err))
    }
    useEffect(()=>{
        getcoupons();
    },[])
    return (
        <div>
            <Nav/>

            <div className="containers">
            <div className="totalctty boxshadow">
                <i className="fas fa-star"></i>
                <h1>
                    <p>total Coupons</p>
                    <p>{Coupons.length}</p>
                </h1>
            </div>
                <div className="Coupondash">
                    <CreateNew getcoupons={getcoupons}/>
                    <AllCoupons getcoupons={getcoupons} coupons={Coupons}/>
                
                
                </div>
            </div>
            
        </div>
    );
};

export default Coupon;