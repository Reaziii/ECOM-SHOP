import axios from 'axios';
import React, { useState } from 'react';
import '../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {NotificationManager} from 'react-notifications'
import queryString from 'query-string'
const NewBanner = ({retrivebanners}) => {
    const [selected,setselected] = useState(3);
    const [imgdata,setimgdata] = useState({});
    const [imgurl,setimgurl] = useState('');
    const [name,setname] = useState('');
    const [url,seturl] = useState('');
    const [product,setproduct] = useState('');
    const [type,settype] = useState('');
    const [status,setstatus] = useState(1);
    const getimage = (e)=>{
        if(e.target.files[0]===undefined || !e.target.files[0]) return 0;

        setimgdata(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setimgurl(url);
    }

    const addbanner = ()=>{
        if(name.length===0){
            NotificationManager.error('insert name please');
            return 0;
        }
        else if(imgurl.length===0){
            NotificationManager.error('banner image please');
            return 0;

        }
        else if(selected===1 && url.length===0){
            NotificationManager.error('url link please');
            return 0;

        }
        else if(selected===2 && product.length===0){
            NotificationManager.error('product code please');
            return 0;

        }
        const fromData = new FormData();
        fromData.append('file',imgdata);
        const config = {
            headers : {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(process.env.REACT_APP_BACKEND_URL+'/upload/image',fromData,config).then(res=>{
            if(res.data.message && res.data.message==='error'){
                NotificationManager.error('something is wrong!')
            }
            else{
                const imgurls = process.env.REACT_APP_BACKEND_URL+'/images/'+res.data;
                const data = queryString.stringify({
                    name,
                    img : imgurls,
                    type : selected===1?'url':selected===2?'product':'none',
                    status : 1,
                    url : selected===1?url:'',
                    product : selected===2?product:'',
                })
                axios.post(process.env.REACT_APP_BACKEND_URL+'/banners',data).then(res=>{
                    if(res.data.message && res.data.message==='saved'){
                        NotificationManager.success('saved')
                        setname('');
                        setimgurl('');
                        setimgdata({});
                        seturl('');
                        setproduct('');
                        setselected(3);
                        retrivebanners();
                    }
                }).catch(err=>console.log(err))

            }

        })
    }
    return (
        <div className="boxshadow first">
            <div className="her_xt">
                Add new Banner
            </div>

            <div style={{padding : '10px'}}>
                <p>Banner Name</p>
                <input value={name} onChange={e=>setname(e.target.value)}/>
                <p>banner image (1200x418)</p>
                
                {
                    imgurl.length?<img style={{maxHeight:'100px'}} src={imgurl}></img>:null

                }
                <input accept="image/x-png,image/gif,image/jpeg" onChange={getimage} id="filexx" style={{display : 'none'}} type="file"/>
                <button onClick={()=>{document.getElementById('filexx').click()}} className="filetoup" >Choose File</button>

                <div className="dropdown">
                    <button className="buttn btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {
                            selected===1?"URL":
                            selected===2?"PRODUCT":"NONE"


                        }
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button onClick={()=>setselected(1)} className="dropdown-item">URL</button>
                        <button onClick={()=>setselected(2)} className="dropdown-item">PRODUCT</button>
                        <button onClick={()=>setselected(3)} className="dropdown-item">NONE</button>

                        
                    </div>
                </div>

                {
                    selected===2?
                    <div className="hellow">
                        <p>product id</p>
                        <input value={product} onChange={e=>setproduct(e.target.value)} placeholder="product id"/>
                    </div>:selected===1?
                    <div className="hellow">
                        <p>URL</p>
                        <input value={url} onChange={e=>seturl(e.target.value)}  placeholder="URL with protocol (https://)"/>

                    </div>:null
                }
            
            
            </div>

            <button onClick={addbanner} className="addbutton">ADD</button>




        </div>
    );
};

export default NewBanner;