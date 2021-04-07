import React, { useState } from 'react';
import './style.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import queryString from 'query-string'
import {datetostring} from '../../../../utils/aboutdate'
const CreateNew = ({getcoupons}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    

    const [name,setname] = useState('');
    const [discountAmmount,setdiscountAmmount] = useState(0);
    const create = () =>{
        if(discountAmmount<0 || discountAmmount>100){
            NotificationManager.error('discount ammount must be in 0 to 100');
            return 0;
        }
        if(name.length===0){
            NotificationManager.error('please enter the name');
            return 0;
        }
        const std = datetostring(startDate);
        
        const end = datetostring(endDate);

        const data = queryString.stringify({
            name,
            startDate : std,
            endDate : end,
            discountAmmount
        })
        axios.post(process.env.REACT_APP_BACKEND_URL+'/coupon',data).then(res=>{
            if(res.data.message==='error'){
                NotificationManager.error('something is wrong');
                
            }
            else if(res.data.message ==='found'){
                NotificationManager.error('please delete that','There is already a coupon name with '+name)
            }
            else getcoupons();
        }).catch(err=>console.log(err))
    }

    return (
        <div className="createNewCoupon boxshadow">
            <div className="her_xt">
                Add new Coupon
            </div>

            <div style={{
                padding : '15px',

            }}>
                <p>Coupon Name</p>
                <input onChange={e=>setname(e.target.value)}/>
                <p>Discount Ammount</p>
                <input onChange={(e)=>setdiscountAmmount(e.target.value)} type="number"/>
                <div className="divideinto">
                    <div className="okk">
                        <p>Start Date</p>
                        <DatePicker selected={startDate} onChange={(e)=>setStartDate(e)}/>
                    </div>
                    <div className="okk">
                        <p>End Date</p>
                        <DatePicker selected={endDate} onChange={(e)=>setEndDate(e)}/>
                    </div>
                    <div>
                    </div>
                </div>

                <button onClick={create} className="addbutton">
                    ADD
                </button>


            
            
            </div>
        </div>
    );
};

export default CreateNew;