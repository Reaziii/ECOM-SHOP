import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../DashNav/Nav';
import AllBanners from './AllBanners/AllBanners';
import NewBanner from './NewBanners/NewBanner';
import './style.scss'
const Banners = () => {
    const [banners,setbanners] = useState([]);
    const retrivebanners = ()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/banners').then(res=>{
            setbanners(res.data);
        })
    }
    useEffect(()=>{
        retrivebanners();
    },[])
    return (
        <div>
            <Nav/>
            <div className="containers Banners-dash">
                <div className="totalctty boxshadow">
                    <i className="fas fa-star"></i>
                    <h1>
                        <p>total banners</p>
                        <p>{banners.length}</p>
                    </h1>
                </div>

                <div className="banners">
                    <div style={{width : '30%'}}>
                        <NewBanner retrivebanners={retrivebanners}/>
                    
                    </div>

                    <div style={{width : '68%'}}>
                        <AllBanners retrivebanners={retrivebanners} banners = {banners}/>
                    </div>
                
                
                
                </div>
            
            
            </div>
        </div>
    );
};

export default Banners;