import axios from 'axios';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import './style.scss';
import Edit from '../Edit/Edit'
const AllCoupons = ({coupons,getcoupons}) => {
    const [search,setsearch] = useState('');
    const [details,setdetails] = useState({});
    const [editid,seteditid] = useState('');
    const [displayedit,setdisplayedit] = useState(0);

    const deletecoupon = (id)=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/coupon/'+id).then(res=>{
            
            if(res.data.message ==='deleted'){
                getcoupons();
            }
            else if(res.data.message==='error'){
                NotificationManager.error('something is wrong')
            }
        }).catch(err=>{
            NotificationManager.error('something is wrong');
        })
    }
    const editboxclick = (id) =>{
        setdetails(coupons[id]);
        seteditid(coupons[id]._id);
        setdisplayedit(true);

    }
    return (
        <div className="AllCoupons">
            {displayedit? <Edit getcoupons={getcoupons} details={details} _id={editid} cancel={setdisplayedit}/> : null}
            
            <div className="boxshadow">
            
            
                <div className="her_xt">
                    Add new Catagory
                </div>
                <div style={{
                    width : '100%',
                    height : '80px',
                    display : 'flex',
                    alignItems : 'center'
                }}>
                    <input onChange={e=>setsearch(e.target.value)} placeholder="search item..." className="searchfield"/>
                
                </div>

                <div style={{padding : '10px'}}>
                    <table className="table">
                        <tr>
                            <td style={{width : '8%'}}>
                                #                        
                            </td>
                            <td style={{width : '23%'}}>
                                Name
                            </td>
                            <td style={{width : '12%'}}>
                                discount %
                            </td>                    
                            <td style={{width : '17%'}}>
                                Start date
                            </td>  
                            <td style={{width : '17%'}}>
                                start end
                            </td>   
                            <td style={{width : '10%'}}>
                                active
                            </td>   

                            <td style={{width:'13%'}}>
                                actions
                            </td>            
                        </tr>

                        {
                            coupons.map((data,i)=>{
                                if(data.name && data.name.toLowerCase().includes(search.toLowerCase())){
                                    
                                    return (
                                        <tr>
                                            <td>
                                                {i}
                                            </td>
                                            <td>
                                                {data.name}
                                            </td>
                                            <td>
                                                {data.discountAmmount}
                                            
                                            </td>
                                            <td>
                                                {data.startDate}
                                            </td>
                                            <td>
                                                {data.endDate}
                                            </td>
                                            <td>
                                                <div className={data.active?'active dot':'terminated dot'}>
                                                
                                                </div>
                                            
                                            </td>

                                            <td className="actionstab">
                                                        <button onClick={()=>deletecoupon(data._id)} className="dd"><i class="fas fa-trash"></i></button>
                                                        <button onClick={()=>editboxclick(i)} className="ed"><i class="fas fa-edit"></i></button> 
                                                    
                                                    </td>
                                        
                                        </tr>
                                    )
                                }
                                else return (
                                    <div></div>
                                )
                            })
                        }
                    
                    
                    
                    
                    
                    </table>
                
                
                
                </div>
            </div>

        </div>
    );
};

export default AllCoupons;