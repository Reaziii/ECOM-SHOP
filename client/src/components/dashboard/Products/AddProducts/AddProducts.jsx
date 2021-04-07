import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { $ }  from 'react-jquery-plugin'
import queryString from 'query-string'
const AddProducts = ({cancel,retrive}) => {
    const [productname,setproductname] = useState('');
    const [productprice,setproductprice] = useState(0);
    const [productstock,setproductstock] = useState(0);
    const [catagories,setcatagories] = useState([]);
    const [productcatdet,setproductcatdet] = useState(null);
    const [productsubcatdet,setproductsubcatdet] = useState(null);
    const [subcatagories,setsubcatagories] = useState([]);
    const [thumbnailforshow,setthumbnailforshow] = useState('');
    const [thumbnailforup,setthumbnailforup] = useState({});
    const [imgsforshow,setimgsforshow] = useState([]);
    const [imgsforup,setimgsforup] = useState([{}]);
    useEffect(async ()=>{
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/catagory').then(res=>{
            setcatagories([...res.data]);
        }).catch(err=>{
            console.log(err);
        })

        await axios.get(process.env.REACT_APP_BACKEND_URL+'/subcatagories').then(res=>{
            setsubcatagories([...res.data]);
        }).catch(err=>console.log(err));
    },[]);

    const catclick = () =>{
        $('#dropcat').toggle(200);
    }
    const uncatclick = (i) =>{
        $('#dropcat').toggle(200);
        const classname = ".catid"+i;
        const len = catagories.length;
        for(var j = 0;j<len;j++){
            const classnamet = ".catid"+j;
            $(classnamet).removeClass('activebutton');
            
        }
        $(classname).addClass('activebutton');
        setproductcatdet({...catagories[i]});
        setproductsubcatdet(null);
    }
    const subcatclick = () =>{
        $('#dropsubcat').toggle(200);
    }
    const unsubcatclick = (i)=>{
        $('#dropsubcat').toggle(200);
        const classname = ".subcat"+i;
        const len = catagories.length;
        for(var j = 0;j<len;j++){
            const classnamet = ".subcat"+j;
            $(classnamet).removeClass('activebutton');
            
        }
        $(classname).addClass('activebutton');
        setproductsubcatdet(subcatagories[i]);
    }

    const thumbnailbutton = (e)=>{
        if(e.target.files[0]===undefined || !e.target.files ) return 0;
        const url = URL.createObjectURL(e.target.files[0]);
        setthumbnailforshow(url);
        setthumbnailforup(e.target.files[0]);
    }
    const imgsbutton = (e)=>{
        const temp = [];
        const temp2 = [];
        if(e.target.files[0]===undefined || !e.target.files ) return 0;
        for(var i = 0;i<e.target.files.length;i++){
            const url = URL.createObjectURL(e.target.files[i]);
            temp.push(url);
        }
        setimgsforshow([...temp])
        setimgsforup([...e.target.files])
    }
    const [thumimgax,setthumimgax] = useState('');
    const [imgsimgax,setimgsimgax] = useState([]); 
    const addbutton = async ()=>{
        var formDate = new FormData();
        formDate.append('file',thumbnailforup);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await axios.post(process.env.REACT_APP_BACKEND_URL+'/upload/image',formDate,config).then(async res=>{
            const thumnbss = process.env.REACT_APP_BACKEND_URL+'/images/'+res.data;
            var formDate2 = new FormData();
            imgsforup.forEach(data=>{
                formDate2.append('file',data);
            })
            await axios.post(process.env.REACT_APP_BACKEND_URL+'/upload/images',formDate2,config).then(async res=>{
                const temp = [];
                res.data.forEach(data=>{
                    const a = process.env.REACT_APP_BACKEND_URL+'/images/'+data;
                    temp.push(a);
                })
                const data = queryString.stringify({
                    name : productname,
                    stock : productstock,
                    price : productprice,
                    thumbnail : thumnbss,
                    imgs : temp,
                    catagoryid : productcatdet._id,
                    subcatagoryid : productsubcatdet._id,
                    catname : productcatdet.name,
                    subcatname : productsubcatdet.name,
                    caticon : productcatdet.iconclass,
                });
        
        
                await axios.post(process.env.REACT_APP_BACKEND_URL+'/product',data).then(async res=>{
                    if(res.data.message==='saved'){
                        await retrive();
                        cancel(0);
                    }
                })
            });

        });
        
        
        
    }

    return (
        <div className="addproductstt">
            <div className="main">
            
                <div className="her_xt">
                    Add new Product <div onClick={()=>cancel(0)} className="cross"><i class="fas fa-power-off"></i></div>
                </div>

                <div style={{padding : '20px',width : '100%',display:'flex',justifyContent:'space-between'}}>
                    <div style={{ width:'45%'}}>
                        <p>name</p>
                        <input onChange={e=>setproductname(e.target.value)}/>
                        <p>price</p>
                        <input type="number" value={productprice} onChange={e=>setproductprice(e.target.value)}/>
                        <p>stock</p>
                        <input type="number" value={productstock} onChange={e=>setproductstock(e.target.value)}/>

                        <button onClick={catclick} className="catnamebut">catagory name</button>
                        <div id="dropcat" style={{display : 'none'}} className="dropdown_txx">
                            {
                                catagories.map((data,i)=>(
                                    <button className={"catid"+i} onClick={()=>uncatclick(i)}>
                                        <i className={data.iconclass}></i> <span>{data.name}</span>
                                        
                                    </button>
                                ))
                            }
                        
                        </div>

                        <button onClick={subcatclick} className="catnamebut">sub catagory name</button>
                        <div id="dropsubcat" style={{display : 'none'}} className="dropdown_txx">
                            {   productcatdet?
                                subcatagories.map((data,i)=>{
                                    if(productcatdet._id===data.parent){
                                        return(
                                            <button className={"subcat"+i} onClick={()=>unsubcatclick(i)}>
                                                <i className={data.iconclass}></i> <span>{data.name}</span>
                                                
                                            </button>
                                        )
                                    }
                                    else return null;
                                })

                                :null
                            }
                        
                        </div>
                            
                        

                    
                    </div>
                    <div className="hogomarashara" style={{ width:'53%'}}>
                        <div>
                            {thumbnailforshow?<img style={{height:'100px'}} src={thumbnailforshow}/>:null}
                        </div>
                        <input id="thumb" type="file" style={{display:'none'}} onChange={thumbnailbutton}/>
                        <button className="buttonss" onClick={()=>document.getElementById('thumb').click()}>choose thumbnail</button>
                        <div className="atx_jj">
                            {
                                imgsforshow.map((data,i)=>(
                                    <div className="boxxx">
                                        <img style={{maxHeight : '100px'}} src={data}/>
                                        <button classname="foxx"><i class="fas fa-trash"></i></button>
                                    </div>
                                ))
                            }
                        
                        </div>

                        <input multiple id="imgss" type="file" style={{display:'none'}} onChange={imgsbutton}/>
                        <button className="buttonss"  onClick={()=>document.getElementById('imgss').click()}>choose thumbnail</button>
                    
                    </div>
                
                
                
                
                </div>
                <button onClick={addbutton} className="addbuttonsss">Add product</button>
           
            </div>
        </div>
    );
};

export default AddProducts;