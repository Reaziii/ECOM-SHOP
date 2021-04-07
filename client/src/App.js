import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import 'react-notifications/lib/notifications.css';
import SubCatagory from './components/dashboard/SubCatagory/SubCatagory';
import Products from './components/dashboard/Products/Products';
import Home from './components/dashboard/Home/Home';
import Catagory from './components/dashboard/Catagory/Catagory';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import SuperUserCheck from './utils/SuperUserCheck';
import Logout from './components/Logout/Logout';
import Coupon from './components/dashboard/Coupon/Coupon';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import UserManagement from './components/dashboard/UserManagement/UserManagement';
import Icons from './components/dashboard/Icons/Icons';
import Message from './components/dashboard/Message/Message';
import OrderManagement from './components/dashboard/OrderManagement/OrderManagement';
import Banners from './components/dashboard/Banners/Banners';
function App() {
  return (
    <div className="" style={{position:'relative'}}>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <SuperUserCheck path="/dashboard" exact component={Home}/>  
        <SuperUserCheck path="/dashboard/catagory" exact component={Catagory}/> 
        <SuperUserCheck path="/dashboard/subcatagory" exact component={SubCatagory}/> 
        <SuperUserCheck path="/dashboard/products" exact component={Products}/>
        <SuperUserCheck path="/dashboard/coupon" exact component={Coupon}/>
        <SuperUserCheck path="/dashboard/usermanagement" exact component={UserManagement}/>
        <SuperUserCheck path="/dashboard/icons" exact component={Icons}/>
        <SuperUserCheck path="/dashboard/messages" exact component={Message}/>
        <SuperUserCheck path="/dashboard/ordermanagement" exact component={OrderManagement}/>
        <SuperUserCheck path="/dashboard/banners" exact component={Banners}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/registration" exact component={Registration}/>
        <Route path="/logout" exact component={Logout}/>

      </Switch>
      </div>
      <NotificationContainer/>

    </div>
  );
}

export default App;
