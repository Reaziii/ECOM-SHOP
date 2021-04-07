import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import defaultHeader from './axios.common.header'
const SuperUserCheck = ({
   component : Component,
   ...rest

}) => {
    const [user,setuser] = useState({});
    const [loading,setloading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/user/me').then(res=>{
            console.log(res);
            dispatch({type : 'LOGIN',payload : res.data})
            setuser(res.data);
            setloading(false)

        })
    },[])

    if(loading){
        return (<div>loading.....</div>)
    }
 
    return (
        <div>
            <Route {...rest} component={(props)=>(
                (!user || user.role!=='super')?(
                    <Redirect to="/"/>
                )
                :(
                    <Component {...props}/>
                )
            )}/>
            
        </div>
    );
};

export default SuperUserCheck;