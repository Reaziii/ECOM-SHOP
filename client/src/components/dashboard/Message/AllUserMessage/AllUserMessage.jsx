import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss'
const AllUserMessage = ({setid,messages,selected,setselected}) => {
    const [search,setserach] = useState('');
    
   
    
    return (
        <div className="allusermessage-dash">
            <div style={{padding : '10px',paddingRight:'20px',paddingTop:'0px'}}>
                <div className="upsearch">
                    <i class="fas fa-search"></i><input onChange={e=>setserach(e.target.value)}/>
                </div>

            </div>
            <div className="messagesscroll">
                
                
                
                {
                    messages.map((data,i)=>{
                        if(data.userid.toLowerCase().includes(search.toLowerCase())){
                            return (
                                <div onClick={()=>{setid(data.userid);setselected(i)}} className={i===selected?"message-box boxshadow reading":"message-box boxshadow"}>
                                    <div style={{display : 'flex',alignItems:'center'}}>
                                    <div  className="dot"></div>
                                    <h1 className="name">{data.userid}</h1>
                                    
                                    </div>
                                    <p className={data.read?"message unread": "message"}>{data.message}</p>
                                </div>
                            )
                        }
                        else return null;
                    })
                }
            </div>
            
        </div>
    );
};

export default AllUserMessage;

