import React, { useState } from 'react';
import './style.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import queryString from 'query-string'
import {datetostring} from '../../../../utils/aboutdate'
const Edit = ({details,_id,cancel,getcoupons}) => {
    const [startDate, setStartDate] = useState(new Date(details.startDate));
    const [endDate,setEndDate] = useState(new Date(details.endDate));
    
    const [name,setname] = useState(details.name);
    const [discountAmmount,setdiscountAmmount] = useState(details.discountAmmount);
    const data = queryString.stringify({
        name,
        discountAmmount,
        startDate : datetostring(startDate),
        endDate : datetostring(endDate),
    })
    const onedit = () =>{
        if(discountAmmount<0 || discountAmmount>100){
            NotificationManager.error('discount ammount must be in 0 to 100');
            return 0;
        }
        axios.put(process.env.REACT_APP_BACKEND_URL+'/coupon/'+_id,data).then(res=>{
            if(res.data.message==='error'){
                NotificationManager.error('something is wrong')
            }
            else if(res.data.message==='notfound'){
                NotificationManager.error('Not found')
            }
            else{
                getcoupons();
                cancel(0);
            }
        }).catch(err=>console.log(err))
    }
    return (
        <div className="editboxCoupon">
            <div className="main">
                <div className="her_xt">
                    Edit Coupon
                </div>

                <div style={{
                    padding : '15px',
                    display: 'flex',
                    justifyContent: 'space-between'
    
                }}>
                    <div className="copondetails">
                        <p>Coupon Name</p>
                        <input value={name} onChange={e=>setname(e.target.value)}/>
                        <p>Discount Ammount</p>
                        <input value={discountAmmount} onChange={(e)=>setdiscountAmmount(e.target.value)} type="number"/>
                    </div>

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
    
                    
    
    
                
                
                </div>
                <div style={{padding:'15px'}}>
                    <button onClick={onedit} className="addbutton">
                        edit
                    </button>

                    <button onClick={()=>cancel(0)} className="addbutton cancel">
                        cancel
                    </button>
                </div>
            
            </div>
        </div>
    );
};

export default Edit;