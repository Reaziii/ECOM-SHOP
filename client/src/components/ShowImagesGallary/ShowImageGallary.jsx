import React, { useState } from 'react';
import './style.scss'
const ShowImageGallary = ({images,setdisplaygallary}) => {
    const [id,setid] = useState(0);
    const increment = () =>{
        var next = id+1;
        next%=images.length;
        setid(next)
    }
    const decrement = () =>{
        var prev = id-1;
        if(prev<0) prev = images.length-1;
        setid(prev)
    }
    return (
        <div className="showimagesgallary">
           <div className="main">
                <button onClick={decrement} className="changebutton a1"><i class="fas fa-backward"></i></button>
                <button onClick={increment} className="changebutton a2"><i class="fas fa-forward"></i></button>
                <button onClick={()=>setdisplaygallary(0)} className="a3"><i class="fas fa-times"></i></button>
                {images && images.length?<img src={images[id]} alt="loading"/>:null}

           </div>
        </div>
    );
};

export default ShowImageGallary;