import React, { useEffect, useState } from 'react';
import './style.scss'
import './e.css'
import EditBox from '../EditBox/EditBox';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import queryString from 'query-string'
import Nav from '../DashNav/Nav';
const Catagory = () => {
    const [icons,seticons] = useState([]);
    const [selected,setselected] = useState(0)
    const [serarchfield,setsearchfield] = useState('');
    const [editbox,seteditbox] = useState(0);
    const [display,setdisplay] = useState(0);
    const [iconclass,seticonclass] = useState('');

    const [Catagories,setcatagories] = useState([]);
    const retreveicons = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/icon').then(async res=>{
            var temp = [];
            for(var i = 0;i<res.data.length;i++){
                temp.push({
                    name : res.data[i].classname,
                    icon : <i className={res.data[i].classname}></i>,
                    id : i,
                    classname : res.data[i].classname
                })
            }
            if(temp.length){
                seticonclass(temp[0].name)
            }
            await seticons(temp)

        }).catch(err=>console.log(err))
    }
    
    const retrivecatagories = async () =>{
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/catagory').then(async res=>{
            var temp = [];
            await res.data.map((value,i)=>{
                temp.push({
                    name : value.name,
                    id : i,
                    oid : value._id,
                    icon : <i className={value.iconclass}></i>,
                    sub : value.Subcatagories,
                    icon_name : value.iconclass,
                    iconid : value.iconid,
                })
            });
            setcatagories(temp);
        }).catch(err=>console.log(err))
    }
    useEffect(async () => {
        retrivecatagories();
        retreveicons();
    }, []);
  
    console.log(Catagories)
    const [newcatagoryname,setnewcatagoryname] = useState('');

    const addnewcatagorybutton = () => {
        if(newcatagoryname.length===0){
            NotificationManager.error('Plase insert catagory name','ERROR');
            return ;
        }
        if(icons.length===0){
            NotificationManager.error('please add icon','ERROR');
            return 0;
        }
        var body = {
            name : newcatagoryname,
            iconid : selected,
            iconclass,
        }
        axios.post(process.env.REACT_APP_BACKEND_URL+'/catagory',queryString.stringify(body)).then(res=>{
            const message = res.data.message;
            if(message==='already'){
                NotificationManager.error('Already Have','error')
            }
            else {
                retrivecatagories();
            }
            
        }).catch(err=>console.log(err))
    }

    const deletecatagory = (id) =>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/catagory/'+id).then(res=>{
            if(res.data.message==='okk'){
                
                retrivecatagories();
            }
            else NotificationManager.error('something is wrong','TRY AGAIN LETTER')
        }).catch(err=>{
            NotificationManager.error('something is wrong','TRY AGAIN LETTER')
        })


    }

    const seletitem = (i)=>{
        setdisplay(0);
        setselected(i);
        seticonclass(icons[i].classname)
    }
    const [editdetails,seteditdetails] = useState(null);
    const editbuttonclick = (i) =>{
        seteditdetails(Catagories[i]);
        seteditbox(true);
    }
    return (
        <div>
        <Nav/>

        <div className="catagory-dash containers">
            {editbox?
            <EditBox retrivecatagories={retrivecatagories} icons={icons} seteditbox={seteditbox} details={editdetails} editdetails={seteditdetails}/>
            :null}
            <div className="totalctty boxshadow">
                <i className="fas fa-star"></i>
                <h1>
                    <p>total Catagories</p>
                    <p>{Catagories.length}</p>
                </h1>
            </div>

            <div className="catagory-data">
                <div style={{width:'30%'}}>
                <div className="create-new boxshadow">
                    <div className="her_xt">
                        Add new Catagory
                    </div>

                    <div className="create-box">
                        <p>Catagory Name</p>
                        <input onChange={(e)=>setnewcatagoryname(e.target.value)} placeholder="catagory name"/>

                        <p>Catagory icon</p>
                        <div className="dropdownicon">
                            {icons.length?<button onClick={()=>setdisplay(!display)}>
                                {icons[selected].icon} {icons[selected].name}
                                <span className={display?'down':''}><i class="fas fa-caret-right"></i></span>
                            </button>

                            :<p style={{fontWeight : '300',fontSize:'13px',color:'red',textAlign:'center'}}>please add icons first</p>}
                            {display?
                            <div className="lists">
                                {
                                    icons.map((data,i)=>(
                                        <button key={i} onClick={()=>seletitem(i)}>{data.icon} {data.name}</button>
                                    ))
                                }

                            </div>:null}
                        
                        </div>

                        <button onClick={addnewcatagorybutton} className="addbutton">
                                Add
                        </button>
                    </div>
                
                </div>
                
                </div>


                <div className="allcatagory ">
                    <div className="her_xt">
                            List of Catagories
                    </div>
                    <div className="boxshadow" style={{padding : '10px'}}>
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

                    <table className="catagorytx">
                        <tr>
                            <td className="cid">
                                #
                            </td>
                            <td className="catagory-icon">
                                Catagory Icon
                            </td>
                            <td className="catagory-name">
                                Catagory Name
                            </td>
                            <td className="catagory-sub">
                                Subcatagories
                            </td>
                            <td className="catagory-actions">
                                Actions
                            </td>
                        </tr>

                            {
                                Catagories.map((data,i)=>{
                                    if(!data.name.toLowerCase().includes(serarchfield.toLowerCase())){
                                        return (
                                            <div></div>
                                        )
                                    }
                                    else{
                                        return (
                                            <tr>

                                                <td>
                                                    {i}
                                                </td>
                                                <td>
                                                    {data.icon}
                                                </td>
                                                <td>
                                                    {data.name}
                                                </td>
                                                <td>
                                                    {data.sub}
                                                </td>

                                                <td className="actionstab">
                                                    <button onClick={()=>deletecatagory(data.oid)} className="dd"><i class="fas fa-trash"></i></button>
                                                    <button onClick={()=>editbuttonclick(i)} className="ed"><i class="fas fa-edit"></i></button> 
                                                
                                                </td>
                                            </tr>
                                        )
                                    }

                                })


                            }
                        
                    
                    </table>

                    </div>



                </div>
            
            </div>
        </div>

        </div>
    );
};

export default Catagory;