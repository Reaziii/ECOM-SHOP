import axios from 'axios';
import React, { useState } from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const AllBanners = ({banners,retrivebanners}) => {
    const deltebutton = (id)=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/banners/'+id).then(res=>{
            console.log(res.data)
            if(res.data.message==='deleted'){
                retrivebanners();
            }
            else NotificationManager.error('something is wrong')
        })
    }
    const [search,setsearch] = useState('')
    const changestatus = (id)=>{
        axios.put(process.env.REACT_APP_BACKEND_URL+'/banners/'+id+'/status').then(res=>{

            if(res.data.message==='saved'){
                retrivebanners();
            }

            else NotificationManager.error('something is wrong')
        })
    }
    return (
        <div className="allbanners">
            <div className="her_xt">
                Banner list
            </div>

            <div style={{padding:'10px'}}>
                <div><input onChange={e=>setsearch(e.target.value)} placeholder="search item..."/></div>

                <div>
                    <table className="table">
                        <tr>
                            <td style={{width : '25%'}}>
                                name
                            </td>
                            <td style={{width : '20%'}}>
                                imgage
                            </td>
                            <td style={{width : '10%'}}>
                                type
                            </td>
                            <td style={{width : '10%'}}>
                                status
                            </td>
                            <td style={{width : '25%'}}>
                                actions
                            </td>
                        
                        
                        
                        
                        </tr>

                        {
                            banners.map((data,i)=>{
                                if(data.name.toLowerCase().includes(search.toLowerCase())){
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {data.name}
                                            </td>
                                            <td>
                                                <img style={{maxHeight:'100%'}} src={data.img}/>
                                            
                                            </td>
                                            <td>
                                                {data.type}
                                            
                                            
                                            </td>
                                            <td>
                                            <div className="dotss">
                                                <div id={data.status?'active':null} className="dot"></div>
        
                                            </div>
                                            
                                            
                                            </td>
        
                                            <td className="actionstab">
                                                <button onClick={()=>changestatus(data._id)} className={data.status?'axx':'ayy'}><i class="fas fa-power-off"></i></button>
                                                <button onClick={()=>deltebutton(data._id)} className="dd"><i class="fas fa-trash"></i></button>
        
                                            
                                            </td>
                                
                                
                                
                                
                                
                                        </tr>
                                    )
                                }
                                else return null;
                            })



                        }
                    
                    
                    
                    </table>
                
                </div>

            </div>

        </div>
    );
};

export default AllBanners;