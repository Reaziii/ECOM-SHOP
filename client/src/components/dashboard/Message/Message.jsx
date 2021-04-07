import React, { useState,useEffect } from 'react';
import './style.scss'
import axios from 'axios';

import Nav from '../DashNav/Nav'
import AllUserMessage from './AllUserMessage/AllUserMessage';
import UserMessage from './UserMessage/UserMessage';
import DetailBox from  './DetailsBox/DetailBox'
const Message = () => {
    const [id,setid] = useState('');
    const [messages,setmessages] = useState([]);
    const [selected,setselected] = useState(0);

    const retrivess2 = ()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/message/fontmessage').then(res=>{
            setmessages([...res.data]);
            if(res.data && res.data.length){
                setid(res.data[0].userid)
            }
        }).catch(err=>console.log(err));
    }

    const retrivess = ()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/message/fontmessage').then(res=>{
            setmessages([...res.data]);
            
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        retrivess2();
    },[]);

    return (
        <div>
            <Nav/>
            <div style={{minHeight:'100vh'}} className="oioioioi">
                <div style={{height:'62px'}}/>
                <DetailBox/>
                <div className="dash-message">

                    <AllUserMessage selected={selected} setselected={setselected} messages={messages} setid={setid}/>
                    <UserMessage setselected={setselected} retrivess={retrivess} id={id}/>
                
                </div>
            </div>
        </div>
    );
};

export default Message;