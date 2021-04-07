import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import defaultHeader from '../../utils/axios.common.header';

const Logout = () => {
    const dispatch = useDispatch();
    dispatch({type:'LOGOUT'});
    localStorage.removeItem('auth');
    defaultHeader();
    return (
        <div>
            <Redirect to="login"/>
        </div>
    );
};

export default Logout;