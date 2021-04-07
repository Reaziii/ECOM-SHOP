import React from 'react';
import './BasicDetails.scss'
const BasicDetails = () => {
    const data = [
        {
            count : 0,
            name : 'new orders',
            icon : <i class="fas fa-shopping-cart"></i>

        },
        {
            count : 1,
            name : 'todays customers',
            icon : <i class="fas fa-user-plus"></i>
        },
        {
            count : 4,
            name : 'todays reviews',
            icon : <i class="fas fa-star"></i>
        },

        {
            count : 19,
            name : 'new contacts',
            icon : <i class="fas fa-envelope"></i>
        }
    ]
    return (
        <div className="BasicDetails">
            {
                data.map((data,i)=>(
                    <div key={i} className="box">
                        <div className="cound" >{data.count}</div>

                        <div className="name">{data.name}</div>
                        <div className="icon">{data.icon}</div>

                        <div className="moreinfo">
                            <p>
                                more info <i class="fas fa-arrow-right"></i>
                            </p>
                        </div> 



                    </div>


                ))
            }
            
        </div>
    );
};

export default BasicDetails;