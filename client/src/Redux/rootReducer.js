import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger from 'redux-logger'
import {catagoryReducer} from './Catagory/Reducer'
import { SubCatagoryReducer } from './Subcatagory/Reducer'
import {AdminNavReducer} from './adminnav/Reducer'
import {UserReducer} from './User/Reducer'
const rootReducer = combineReducers({
    catagoryReducer,
    SubCatagoryReducer,
    AdminNavReducer,
    UserReducer,
    
    
})


const store = createStore(rootReducer,applyMiddleware(logger));

export default store;