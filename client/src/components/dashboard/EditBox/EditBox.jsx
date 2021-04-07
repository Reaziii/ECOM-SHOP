import axios from 'axios';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import queryString from 'query-string'
import './Editbox.scss'
const EditBox = ({details,editdetails,seteditbox,icons,retrivecatagories}) => {
    const [catagoryname,setcatagoryname] = useState(details.name);
    const [catagoryicon,setcatagoryicon] = useState(details.icon);
    const [display,setdisplay] = useState(0);
    console.log(details)
    const [selected,setselected] = useState({
        name : details.icon_name,
        icon : details.icon,
        id : details.iconid,
    });
    const seletitem = (i)=>{
        setdisplay(0);
        setselected({
            name : icons[i].name,
            icon : icons[i].icon,
            id : icons[i].id,
        })
    }
    const save = async () =>{
        if(catagoryname.length===0){
            NotificationManager.error('please insert catagory name');
            return ;
        }
        var body = {
            name : catagoryname,
            iconid : selected.id,
            classname : selected.name
        }
        await axios.put(process.env.REACT_APP_BACKEND_URL+'/catagory/'+details.oid,queryString.stringify(body)).then(res=>{
            if(res.body.message==='ok'){
                NotificationManager.success('succesfully edited');
            }
            else{
                NotificationManager.error('somthing is wrong','TRY AGAIN LETTER');
            }
        }).catch(err=>console.log(err))

        seteditbox(0);
        retrivecatagories();




    }
    return (
        <div className="editbox">
            <div className="mainbox">
            <div className="create-new boxshadow">
            <div className="her_xt">
                Edit catagory
            </div>

            <div className="create-box">
                <p>Catagory Name</p>
                <input value={catagoryname} onChange={(e)=>setcatagoryname(e.target.value)} placeholder="catagory name"/>

                <p>Catagory icon</p>
                <div className="dropdownicon">
                    {icons.length?<button onClick={()=>setdisplay(!display)}>
                        {selected.icon} {selected.name}
                        <span className={display?'down':''}><i class="fas fa-caret-right"></i></span>
                    </button>

                    :null}
                    {display?
                    <div className="lists">
                        {
                            icons.map((data,i)=>(
                                <button key={i} onClick={()=>seletitem(i)}>{data.icon} {data.name}</button>
                            ))
                        }

                    </div>:null}
                
                </div>

                <button onClick={save} className="addbutton">
                        Edit
                </button>
                <button onClick={()=>seteditbox(0)} className="closebutton">
                        Close
                </button>
            </div>
        
        </div>
            </div>
        </div>
    );
};

export default EditBox;