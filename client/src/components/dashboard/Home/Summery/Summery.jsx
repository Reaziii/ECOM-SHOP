import React from 'react';
import './Summery.scss'
const Summery = () => {
    const catagory = {
        count : 5,
        name : 'Catagory',
    }
    const subcatagory = {
        count : 10,
        name : 'Sub Catagory'
    }
    const products = {
        count : 100,
        name : 'Products'
    }
    const reviews = {
        count : 20,
        name : 'Total Reviews',
    }
    const mails = {
        count : 20,
        name : 'Total mails'
    }
    return (
        <div className="summerysdash">
            <div className="catagory box">
                <i className="fas fa-star"></i> 
                <h1>Catagories</h1>
                <p>{catagory.count}</p>
            
            </div>
            <div className="catagory box">
            <i className="fas fa-star-half-alt"></i>
                <h1>Sub Catagories</h1>
                <p>{subcatagory.count}</p>
            
            </div>
            <div className="catagory box">
                <i className="fas fa-star-of-david"></i> 
                <h1>Products</h1>
                <p>{products.count}</p>
            
            </div>
            
            <div className="subcatagory box">
                <i className="fas fa-shopping-bag"></i> 
                <h1>Orders</h1>
                <p>{catagory.count}</p>
            
            </div>
            <div className="subcatagory box">
                <i className="fas fa-money-bill-alt"></i>
                <h1>Sales</h1>
                <p>{subcatagory.count}</p>
            
            </div>
            <div className="subcatagory box">
                <i class="fas fa-road"></i>
                <h1>Pending</h1>
                <p>{subcatagory.count}</p>
            
            </div>
            
            
            
        </div>
    );
};

export default Summery;