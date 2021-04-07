import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../DashNav/Nav';
import Edit from './Edit/Edit';
import './style.scss'
const UserManagement = () => {
    const [searchfield,setsearchfield] = useState('');
    const [users,setusers] = useState([]);
    const [editdisplay,seteditdisplay] = useState(0);
    const [details,setdetails] = useState({});
    const getusers = ()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/user').then(res=>{

            setusers(res.data);
        })
    }
    useEffect(()=>{
        getusers();
    },[]);
    const delteitem = (id) =>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/user/'+id).then(res=>{
            console.log(res.data);
            getusers();
        })
    }
    const editdis = (id) =>{
        setdetails(users[id]);
        seteditdisplay(1);
    }
    return (
        <div>
            <Nav/>
            <div className="containers usermanagement">
                {
                    editdisplay?<Edit cancel={seteditdisplay} details={details} getusers={getusers}/>:null
                }
            <div className="totalctty boxshadow">
                <i className="fas fa-star"></i>
                <h1>
                    <p>total users</p>
                    <p>{users.length}</p>
                </h1>
            </div>

            <div className="alluser boxshadow">
                <div className="her_xt">
                    Add new Catagory
                </div>

                <div className="searchfield">
                    <input onChange={e=>setsearchfield(e.target.value)} placeholder="search user..."/>
                </div>
                <div style={{padding : '20px'}}>
                    
                    <table className="tablealluser">
                        <tr>
                            <td style={{width:'6%'}}>
                                #
                            </td>
                            <td style={{width:'23%'}}>
                                username
                            </td>  
                            
                            <td style={{width:'26%'}}>
                                email
                            </td>
                            <td style={{width:'20%'}}>
                                phone number
                            </td>
                            <td style={{width : '10%'}}>
                                role
                            </td>
                            <td style={{width:'15%'}}>
                                actions
                            </td>
                        </tr>

                        {
                            users.map((data,i)=>{
                                if(data._id.toLowerCase().includes(searchfield.toLowerCase())){
                                    return (
                                        <tr>
                                            <td>{i}</td>
                                            <td>{data._id}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.role}</td>
                                            <td className="actionstab">
                                                {data.role==='super'?null:<button onClick={()=>delteitem(data._id)} className="dd"><i class="fas fa-trash"></i></button>}
                                                <button onClick={()=>editdis(i)} className="ed"><i class="fas fa-edit"></i></button> 
                                                <button style={{color:'#39CCCC'}} className="info"><i class="fas fa-info-circle"></i></button>
                                            
                                            </td>
                                        
                                        </tr>
                                    )
                                }
                                else{
                                    return null;
                                }
                            })
                        }
                    
                    
                    
                    
                    
                    </table>

                </div>
            
            
            
            
            
            
            
            </div>
            
            
            
            
            </div>
        </div>
    );
};

export default UserManagement;