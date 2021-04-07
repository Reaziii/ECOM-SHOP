import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../DashNav/Nav';
import './style.scss'
import queryString from 'query-string'
import { NotificationManager } from 'react-notifications';
const SubCatagory = () => {
    const filechoseforup = () =>{
        document.getElementById('subcatimgup').click();
    }
    const [serarchfield,setsearchfield] = useState('');
    const [seleteditem,setselecteditem] = useState(null);
    const [display,setdisplay] = useState(0);
    const [subcatagoryimage,setsubcatimgagedd] = useState('');
    const [addloding,setaddloding] = useState(true);
    const [filetoup,setfiletoup] = useState(null);
    const [subcatname,setsubcatname] = useState('')
    const addsubcatagoryimage = (e) =>{
        if(e.target.files[0]===undefined) return  0;
        setfiletoup(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0]);
        setsubcatimgagedd(url)
    } 
    const [Catagories,setcatagories] = useState([])
    const retrivecatagories = async () =>{
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/catagory').then(res=>{
            var temp = [];
            res.data.map((value,i)=>{
                temp.push({
                    name : value.name,
                    id : i,
                    oid : value._id,
                    icon : <i className={value.iconclass}></i>,
                    sub : value.Subcatagories,
                    icon_name : value.iconclass,
                    iconid : value.iconid,
                    _id : value._id
                })
            });
            setcatagories([...temp]);
            if(temp.length) setselecteditem(temp[0])
            setaddloding(false);
        }).catch(err=>console.log(err))
    }
    useEffect(()=>{
        retrivecatagories();


    },[])
    const seleteditembutton = (i) =>{
        setselecteditem(Catagories[i]);
        setdisplay(0);
    }

    const [subcatagory,setsubcatagory] = useState([]);
    const retrivesubcatagory = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/subcatagories').then(res=>{
            setsubcatagory([...res.data]);
            console.log(subcatagory)
        })
    }
    const [imggg,setimggg] = useState('')
    const newsubcatagoryadd = () =>{
        var formDate = new FormData();
        formDate.append('file',filetoup);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(process.env.REACT_APP_BACKEND_URL+'/upload/image',formDate,config).then(res=>{
            const img = process.env.REACT_APP_BACKEND_URL+'/images/'+res.data;
            console.log(seleteditem)
            const data = queryString.stringify({
                img : img,
                name : subcatname,
                parentid : seleteditem._id,
                parentname : seleteditem.name,
                parenticon : seleteditem.icon_name,

            })
            console.log(data)
            axios.post(process.env.REACT_APP_BACKEND_URL+'/subcatagories',data).then(res=>{
                console.log(res.data);
                if(res.data.message && res.data.message==='error'){
                    NotificationManager.error('something is wrong');
                }
                else if(res.data.message && res.data.message==='already'){
                    NotificationManager.error('Already exist');
                }
                else{
                    retrivesubcatagory();
                }
            })
        })

    }

    
    useEffect(()=>{
        retrivesubcatagory();
    },[])

    const deletesubcat = (id)=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/subcatagories/'+id).then(res=>{
            if(res.data.message!=='deleted'){
                NotificationManager.error('something is wrong');
            }
            else {
                retrivesubcatagory();
            }
        })
    }

    return (
        <div><Nav/>
        <div className="subcatagory-dash containers">
            <div className="totalctty boxshadow">
                <i className="fas fa-star"></i>
                <h1>
                    <p>Total Subcatagories</p>
                    <p>{subcatagory.length}</p>
                </h1>
            </div>

            <div className="subcatagory-data">
                <div className="newsubcatagory">
                    {addloding?'loading...':
                    <div className="boxshadow adding">
                        <div className="her_xt">Add new sub catagory</div>

                        <div style={{padding:'20px'}}>
                        <div className="text">Sub Catagory name</div>
                        <input onChange={e=>setsubcatname(e.target.value)} placeholder="subcatagory name"/>
                        <div className="text">Parent catagory</div>
                        {seleteditem ?
                        <button onClick={()=>setdisplay(!display)} className="parents"><p>{seleteditem.icon} {seleteditem.name}</p><i id={display?'down':''} className="fas fa-caret-right"></i> </button>:null}
                       
                                <div style={{
                                    maxHeight : display?'200px':'0px',
                                    transition: '0.2s all'
                                
                                
                                
                                }} className="parant-drop">
                                {
                                    Catagories.map((data,i)=>(
                                        <button onClick={()=>seleteditembutton(i)} className="parentso" key={i}>
                                            {data.icon} {data.name}

                                        </button>
                                    ))
                                }
                            
                            
                                </div>
                     
                        <div style={{marginTop:'20px'}} className="text">subcatagory image</div>
                        {
                            subcatagoryimage.length?<div className="addedsubcat_tyy">
                                <img src={subcatagoryimage} alt='wait'/>                            
                            </div>:null
                        }
                        <input onChange={addsubcatagoryimage} id="subcatimgup" style={{display:'none'}} type="file"></input>
                        <div className="filesec"><button style={{width:'100%'}} onClick={filechoseforup}>Chose a file</button>
                        </div>

                        <button onClick={newsubcatagoryadd} className="addbutton">ADD</button>

                        </div>
                    
                    
                    </div>}
                
                </div>

                <div className="allsubcatagory">
                    <div style={{width:'100%'}} className="boxshadow">
                        <div className="her_xt">List of sub Catagories</div>
                        <div style={{padding : '10px'}}>
                        <div style={{
                       
                            width:'100%',
                            display: 'flex',
                            justifyContent : 'right'
                        }}>
                        <div className="serach-box">
                        <i class="fas fa-search"></i>
                        
                            <input onChange={(e)=>setsearchfield(e.target.value)} placeholder="Search catagory..."></input>
                        </div>
    
                        </div>
                        
                        <table className="subcatagorytable">
                            <tr>
                                <td className="sid">
                                    #
                                </td>
                                <td className="simg">
                                    subcatagory img
                                </td>
                                <td className="sname">
                                    subcatagory name
                                </td>
                                <td className="spar">
                                    Parent
                                </td>

                                <td className="sact">
                                    Actions
                                </td>
                            
                            </tr>

                            {
                                subcatagory.map((data,i)=>(
                                    <tr key={i}>
                                        <td>
                                            {i}
                                        </td>
                                        <td>
                                            <img style={{height:'100%'}} src={data.img} alt="data.name"></img>
                                        </td>
                                        <td>
                                            {data.name}
                                        </td>
                                        <td>
                                            <i className={data.parenticon}></i> {data.parentname}
                                        </td>
                                        <td className="actionstab">
                                            <button onClick={()=>deletesubcat(data._id)} className="dd"><i class="fas fa-trash"></i></button>
                                            <button className="ed"><i class="fas fa-edit"></i></button> 
                                        
                                        </td>
                                        
                                    
                                    </tr>
                                ))


                            }
                        
                        
                        </table>
                    
                    </div>
                    </div>
                </div>
            
            
            
            </div>
        </div>
        </div>
    );
};

export default SubCatagory;