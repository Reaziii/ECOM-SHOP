import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import './style.scss';
import queryString from 'query-string'
import defaultHeader from '../../utils/axios.common.header';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import img from './logo.svg'
const Registration = () => {
    const [username,setusername] = useState(' ');
    const [password,setpassword] = useState(' ');
    const [email,setemail] = useState('');
    const [phone,setphone] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading,setloading] = useState(true);

    const isLogged = async () =>{
        if(!localStorage.getItem('auth') || localStorage.getItem('auth').length===0) {
            setloading(false);
            return 0;
        }
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/user').then(res=>{
            if(res.data.message==='notauth'){
            }
            else{
                dispatch({type : 'LOGIN',payload : res.data})
                if(res.data.role==='super'){
                    history.push('/dashboard');
                }
                else{
                    history.push('/')
                }
            }
        }).catch(err=>{
            NotificationManager.error('something is wrong')
        })
    }
    useEffect(()=>{
        isLogged();
    },[]);

    const registration = () =>{   
        if(username.length===0 || password.length===0 || email.length===0 || phone.password){
            NotificationManager.error('please fillup all field')
            return 0;
        }
        var body = {
            username,
            password,
            email,
            phone,
        }
        axios.post(process.env.REACT_APP_BACKEND_URL+'/user/registration',queryString.stringify(body)).then(res=>{
            if(res.data.message){
                NotificationManager.error(res.data.message)
            }
            else{
                NotificationManager.success('Account created');
                history.push('/login')
            }
        })
    }
    if(loading)
    {
        return (<div>loading....</div>)
    }
    return (
        <div
            style={{
                minHeight:'100vh',
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}
        >
        <div className="registration loginpage boxshadow ">
            <div className="rightimg">
                <img src={img} alt=""/>
            </div>
            <div className="leftdata">
                <h1>User Login</h1>
                <p>username : </p>
                <input type="text" value={username} name="usernameskkkd" onChange={e=>setusername(e.target.value)} autocomplete="off"/>
                <p>password : </p>

                <input type="password" name="pwd" onChange={e=>setpassword(e.target.value)} autocomplete="off"/>
                <p>email : </p>

                <input name="eml" onChange={e=>setemail(e.target.value)}/>
                <p>phone NO : </p>

                <input onChange={e=>setphone(e.target.value)}/>

                <button onClick={registration}>login</button>

                <Link to="/login">already have an account</Link>

            </div>
            
        </div>
        
        </div>
    );
};

export default Registration;