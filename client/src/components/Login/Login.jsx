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
const Login = () => {
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');
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

    const login = () =>{   
        if(username.length===0 || password.length===0){
            NotificationManager.error('please enter username and password')
            return 0;
        }
        var body = {
            username,
            password
        }
        axios.post(process.env.REACT_APP_BACKEND_URL+'/user/login',queryString.stringify(body)).then(res=>{
            if(res.data.message){
                NotificationManager.error('username or password is incorrect')
            }
            else{
                localStorage.setItem('auth',res.data.token);
                dispatch({type : 'LOGIN',payload : res.data.user});
                defaultHeader();
                if(res.data.user.role==='super'){
                    history.push('/dashboard');
                }
                else history.push('/')
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
        <div className="loginpage boxshadow">
            <div className="rightimg">
                <img src={img} alt=""/>
            </div>
            <div className="leftdata">
                <h1>User Login</h1>
                <p>username : </p>
                <input onChange={e=>setusername(e.target.value)}/>
                <p>password : </p>

                <input type="password" onChange={e=>setpassword(e.target.value)}/>

                <button onClick={login}>login</button>

                <Link to="/registration">create a new account</Link>

            </div>
            
        </div>
        
        </div>
    );
};

export default Login;