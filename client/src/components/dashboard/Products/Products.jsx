import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ShowImageGallary from '../../ShowImagesGallary/ShowImageGallary';
import Nav from '../DashNav/Nav';
import AddProducts from './AddProducts/AddProducts';
import './style.scss'
const Products = ({catagories,subcatagories}) => {
    const [products,setproducts] = useState([])
    
    const [displaygallary,setdisplaygallary] = useState(0);
    const [displaygallaryid,setdisplaygallaryid] = useState(0);
    const [displayimages,setdisplayimages] = useState({});
    const [addproduct,setaddproduct] = useState(0);
    const setimageshow = (id) =>{
        setdisplayimages(products[id].imgs)
        setdisplaygallary(1);
    }
    const [Catagories,setcatagories] = useState([]);
    const [Subcatgories,setsubcata] = useState([]);
    const retriveproduct = async () =>{
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/product').then( async res=>{
            setproducts(res.data)
            

        });
    }

    const deletebutton = (id)=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL+'/product/'+id).then(res=>{
            if(res.data.message==='deleted'){
                retriveproduct();
            }
        })
    }

    useEffect(()=>{
        retriveproduct();


    },[])
    return (
        <div><Nav/>

        <div className="dash-products containers">
            {
                displaygallary?
                <ShowImageGallary images={displayimages} setdisplaygallary={setdisplaygallary}/>:null
            }
            {
                addproduct?<AddProducts cancel={setaddproduct} retrive={retriveproduct}/>:null
            }
            <div className="top-panel-dash">
                <div className="totalctty boxshadow">
                    <i className="fas fa-star"></i>
                    <h1>
                        <p>total Products</p>
                        <p>{products.length}</p>
                    </h1>
                </div>
                <div onClick={()=>setaddproduct(1)} className="totalctty boxshadow secnd">
                    <i class="fas fa-plus"></i>
                    <h1>
                        <p>Add New Product </p>
                        <p>Go</p>
                    </h1>
                </div>
            </div>

            <div className="allproducts-dash boxshadow">
                <div className="her_xt">
                    Manage Products
                </div>
            <div style={{padding : '10px'}}>

                <table className="producttable">
                    <tr>
                        <td className="pid">
                                                
                        </td>
                        <td className="pthumb">
                            thumbnail
                        
                        </td>
                        <td className="pname">
                            product name
                        
                        </td>
                        <td className="pcat">
                            catagory
                        
                        </td>
                        <td className="psubcat">
                            All images
                        
                        </td>
                        <td className="pstck">
                            Stock
                        
                        </td>
                        <td className="pprice">
                            Price
                        
                        </td>
                        <td className="pactions">
                            actions
                        
                        </td>
                    
                    
                    </tr>
                    {
                        products.map((data,i)=>(
                            <tr key={i}>
                                <td>
                                    {i}
                                </td>
                                <td>
                                    {data.thumbnail.length?
                                        <img style={{maxHeight:'60px'}} src={data.thumbnail} alt="thumbnail"></img>:'-'
                                    }
                                </td>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    <i className={data.caticon}></i> {data.catname}  <i style={{margin:'0px 4px'}} class="fas fa-caret-right"></i>
                                    {data.subcatname}
                                
                                </td>
                                <td>
                                    <button onClick={()=>setimageshow(i)} className="showallimage">Image/s</button>
                                    
                                
                                </td>
                                <td>
                                    {data.stock}
                                </td>
                                <td>
                                    {data.price}
                                </td>
                                <td className="actionstab">
                                    <button onClick={()=>deletebutton(data._id)} className="dd"><i class="fas fa-trash"></i></button>
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
    );
};
const get = (state) =>({
    catagories : state.catagoryReducer.Catagories,
    subcatagories : state.SubCatagoryReducer.subcatagories
})
export default connect(get,null)(Products);