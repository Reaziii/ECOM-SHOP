const init = {
    user : null,
    is_auth : false,
}

export const UserReducer = (state=init,actions={})=>{
    switch(actions.type){
        case 'LOGIN':
            return{
                ...state,
                user : actions.payload,
                is_auth : true,

            }
        case 'LOGOUT':
            return{
                ...state,
                user : null,
                is_auth : false,
            }
        default :
            return state;
    }
}