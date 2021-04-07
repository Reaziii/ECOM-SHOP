import defaultHeader from "../../utils/axios.common.header"

const init = {
    store_managment : 0,
}

export const AdminNavReducer = (state = init,actions={}) =>{
    switch(actions.type){
        case 'SET_STORE_MANAGMENT':
            return {
                ...state,
                store_managment : actions.payload
            }
        case 'FLIP_STORE_MANAGMENT':
            return{
                ...state,
                store_managment : !state.store_managment,
            }
        default : 
            return state;
    }
}