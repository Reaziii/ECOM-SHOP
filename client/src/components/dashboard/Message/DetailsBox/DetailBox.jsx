import React from 'react';
import './style.scss'
const DetailBox = () => {
    return (
        <div className="detailsbox-dash">
            <div className="box box1">
                <div className="under"><h1>12345</h1>
                <p>this Day</p></div>
            </div>
            <div className="box box2">
                <div className="under"><h1>12345</h1>
                <p>this Weak</p></div>
            </div>
            <div className="box box3">
                <div className="under"><h1>12345</h1>
                <p>this Month</p></div>
            </div>
            <div className="box box4">
                <div className="under"><h1>12345</h1>
                <p>this Year</p></div>
            </div>
        </div>
    );
};

export default DetailBox;