import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss'
import {$} from 'react-jquery-plugin'
import queryString from 'query-string'
const UserMessage = ({id,retrivess,setselected}) => {
    const [messages,setmessages] = useState([]);
    const [message,setmessage] = useState('');
    const retrivemessage = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/message/user/'+id).then(res=>{
            setmessages([...(res.data.message)]);
            retrivess();

            scrol();

        }).catch(err=>console.log)
    }
    useEffect(()=>{
        retrivemessage();



    },[id]);

    const scrol  = ()=>{
        $('#lksdjflskdjflsdkjf').animate({ scrollTop : '100000px'});

    }

    const sendmessagebutton = async ()=>{
        if(message.length===0){
            alert('no message found');
            return 0;
        }
        const data = queryString.stringify({
            message : message,
            userid : id,
        });

        await axios.post(process.env.REACT_APP_BACKEND_URL+'/message/admin',data).then(res=>{
            setmessage('')
            retrivemessage();

        })
        setselected(0);


    }


    return (
        <div className="Userdashmessage">
            <div id="lksdjflskdjflsdkjf" className=" main messagesscroll">
                
                
                {
                    messages.map((data,i)=>(
                        <div key={i} className={!data.send?"mymessage":"othermessage"}>
                            <p>
                               {data.message}
                            </p>
                        </div>
                    ))
                }

                
            
            </div>

            <div className="sendmessagebox">
                    <input value={message} onChange={e=>setmessage(e.target.value)}/>
                    <button onClick={sendmessagebutton}><i class="fas fa-paper-plane"></i></button>
            
            </div>
        </div>
    );
};

export default UserMessage;