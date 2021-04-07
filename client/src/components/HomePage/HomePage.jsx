import axios from 'axios';
import React, { useState } from 'react';
import queryString from 'query-string'
const HomePage = () => {
    const [m,setm] = useState('');
    const send = ()=>{
        const me = queryString.stringify({
            message : m,
        })
        axios.post(process.env.REACT_APP_BACKEND_URL+'/message/public',me).then(res=>{
            console.log(res.data)
        
        })
    }
    return (
        <div>
            <input onChange={e=>{setm(e.target.value)}}/>
            <button onClick={send}>send</button>
        </div>
    );
};

export default HomePage;