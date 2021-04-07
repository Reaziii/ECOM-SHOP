const init = {
    Catagories : [
        {
            name : 'Health and tips',
            icon : <i class="fas fa-home"></i>,
            icon_name : 'home',
            sub : 2,
            id : 0,
        },
        {
            name : 'Actions and stars',
            icon : <i class="fas fa-star"></i>,
            sub : 6,
            id : 1,
            icon_name : 'star',

        },
        {
            name : 'Health and tips',
            icon : <i class="fas fa-home"></i>,
            icon_name : 'home',
            sub : 2,
            id : 2,
        },
        {
            name : 'Actions and stars',
            icon : <i class="fas fa-star"></i>,
            sub : 6,
            id : 3,
            icon_name : 'star',

        },
        {
            name : 'Health and tips',
            icon : <i class="fas fa-home"></i>,
            icon_name : 'home',
            sub : 2,
            id : 4,
        },
        {
            name : 'Actions and stars',
            icon : <i class="fas fa-star"></i>,
            sub : 6,
            id : 5,
            icon_name : 'star',

        }
    ]
}

export const catagoryReducer = (state = init,actions={}) =>{
    switch(actions.type){
        case 'ADD_CATAGORY_ITEM' : 
            return{
                ...state,
                Catagories : [...state.Catagories,actions.payload]
            }
        default :
            return state;
    }
}