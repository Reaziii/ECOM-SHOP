import React, { useEffect, useState } from 'react';
import './Nav.scss'
import logo from './logo.png'
import { Link, NavLink } from 'react-router-dom';
import { $ }  from 'react-jquery-plugin'
import { connect, useDispatch, useSelector } from 'react-redux';
const Nav = ({sm}) => {
    const dispatch = useDispatch();
    const [user,setuser] = useState(useSelector(state=>state.UserReducer.user));
    const [ab,setab] = useState(useSelector(state=>state.AdminNavReducer.store_managment));
    
    const a1 = (a)=>{
        $('.store-management').toggle(200);
        console.log(a.target.style.background)
        $('.lkjlkj').toggleClass('down');
        dispatch({type : 'FLIP_STORE_MANAGMENT'});

    }
    return (
        <div>
            <div className="dash-nav">
                <div className="header">
                    <img src={logo} alt="logo"/> <p>Sitename</p>

                
                </div>
                <ul className="main-nav">
                    <NavLink activeClassName="activenavttt" to="/dashboard" exact><li><i class="fas fa-tools"></i> Dashboard</li></NavLink>
                    <button className="li" style={{
                        background : sm?'rgb(205, 92, 92)':'',
                    }} onClick={a1.bind(this)}><i class="fas fa-store"></i> Store Management 
                        <div className="arrowt"><i className={sm?'down lkjlkj fas fa-chevron-left':' lkjlkj fas fa-chevron-left'}></i></div>
               
                    </button>
                    <ul style={{display:ab?'block':'none'}} className="store-management">
                        <NavLink activeClassName="activenavttt" to="/dashboard/catagory"> <li><i className="fas fa-star"></i> Catagories  </li></NavLink>
                        <NavLink activeClassName="activenavttt" to="/dashboard/subcatagory" ><li><i className="fas fa-star-half-alt"></i> Sub Catagories</li></NavLink>
                        <NavLink activeClassName="activenavttt" to="/dashboard/products" ><li><i className="fas fa-star-of-david"></i> Products</li></NavLink>
                        <NavLink activeClassName="activenavttt" to="/dashboard/coupon"><li><i className="fas fa-tags"></i> Coupon</li></NavLink>
                        <NavLink activeClassName="activenavttt" to="/dashboard/banners"><li><i class="far fa-images"></i> Banners</li></NavLink>
                        
                    
                    </ul>

                    <li><i className="fas fa-shopping-bag"></i> Order Management</li>
                    <li><i className="fas fa-layer-group"></i> Stock Management</li> 
                    <li><i className="fas fa-money-bill-alt"></i> Sales Management</li>
                    <NavLink activeClassName="activenavttt" to="/dashboard/messages"><li><i className="fas fa-envelope"></i> Mail and Contacts</li></NavLink>
                    <li><i className="fas fa-comments"></i> Products Reviews</li>
                    <NavLink activeClassName="activenavttt" to="/dashboard/usermanagement"><li><i class="fas fa-users-cog"></i> User Management</li></NavLink> 
                    <NavLink activeClassName="activenavttt" to="/dashboard/icons"><li><i class="fas fa-icons"></i> Icons</li></NavLink> 

                </ul>

                
            </div>

            <div className="dash-top">
                <div>
                    <i class="fas fa-bars"></i>
                </div>
                <p>{user._id}</p>
            
            </div>

        </div>
    );
};

const get = (state)=>({
    sm : state.AdminNavReducer.store_managment,
})

export default connect(get,null)(Nav);