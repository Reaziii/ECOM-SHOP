import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../DashNav/Nav';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import queryString from 'query-string'
import './style.scss'
const Icons = () => {
    const [icon,seticon] = useState('fas fa-icons');
    const [search,setsearch] = useState('');
    const [icons,seticons] = useState([]);
    const geticons = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/icon').then(res=>{
            if(res.data.message && res.data.message==='error'){
                NotificationManager.error('something is wrong');
            }
            else{
                seticons([...res.data]);
            }
        })
    }
    const posticon = () =>{
        const data = queryString.stringify({
            classname : icon
        })
        axios.post(process.env.REACT_APP_BACKEND_URL+'/icon',data).then(res=>{
            if(res.data.message==='error'){
                NotificationManager.error('something is wrong');
            }
            else if(res.data.message==='already'){
                NotificationManager.error('Already exist')
            }
            else geticons();
        })
    }
    useEffect(()=>{
        geticons();
    },[])
    return (
        <div>
            <Nav/>
            <div className="containers">
                <div className="totalctty boxshadow">
                    <i className="fas fa-star"></i>
                    <h1>
                        <p>total Icons</p>
                        <p>{icons.length}</p>
                    </h1>
                </div>

                <div className="Icons-dash">
                    <div className="addicon">
                        <div className="boxshadow">
                            <div>
                                <div className="her_xt">
                                    Add new Icon
                                </div>

                                <div style={{padding:'20px'}}>
                                    <p>add icon class</p>
                                    <input value={icon} onChange={(e)=>seticon(e.target.value)}/>
                                    <p>your icon</p>
                                    <p><i id="i1" className={icon}></i> <i id="i2" className={icon}></i> <i id="i3" className={icon}></i></p>
                                    <button onClick={posticon}>submit</button>

                                
                                
                                </div>

                            
                            
                            </div>

                        </div>
                    
                    
                    </div>

                    <div className="allicons">
                        <div className="boxshadow">
                            <div className="her_xt">
                                All icons
                            </div>
                            <input className="searchbox" placeholder="search icon..." onChange={e=>setsearch(e.target.value)}/>
                            <div className="listicons" style={{padding : '10px'}}>
                                {
                                    icons.map((data,i)=>{
                                        if(data.classname.toLowerCase().includes(search.toLowerCase())){
                                            return(
                                                <div key={i} className="icons boxshadow">
                                                    <i className={data.classname}></i>
                                                    <p>{data.classname}</p>
                                                </div>

                                            )
                                        }
                                        else return(
                                            null
                                        )

                                    })
                                }

                            
                            </div>
                        </div>

                        
                    
                    </div>
                
                
                
                </div>
            </div>

        
        </div>
    );
};

export default Icons;