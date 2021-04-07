import axios from 'axios';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import './style.scss'
import queryString from 'query-string'

const Edit = ({getusers,details,id,cancel}) => {
    const [seleted,setselected] = useState(details.role);
    const [display,setdisplay] = useState(0);

    const editclick = () =>{
        const data = queryString.stringify({
            role : seleted
        })
        axios.put(process.env.REACT_APP_BACKEND_URL+'/user/'+details._id+'/role',data).then(res=>{
            if(res.data.message==='saved'){
                getusers();
                cancel(0);

            }
            else{
                NotificationManager.error('something is wrong')
            }
        })
    }
    return (
        <div className="editboxCoupon">
            <div className="main">
                <div className="her_xt">
                    Edit User
                </div>
                
                <div className="selects">
                    <p>User role</p>
                    <button onClick={()=>setdisplay(!display)}>
                        {seleted}
                    </button>
                    {!display?null:
                    <div className="select">
                        <div className="boxshadow">
                            <button onClick={()=>{setselected('admin');setdisplay(0)}} className="option">admin</button>
                            <button onClick={()=>{setselected('public');setdisplay(0)}} className="option">public</button>
                        </div>
                    
                    </div>
                    }
                
                </div>

                <div style={{padding:'15px'}}>
                    <button onClick={editclick} className="addbutton">
                        save
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