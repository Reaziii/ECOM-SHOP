
const inti = {
    subcatagories : [
        {
            name : 'body',
            parent : 0,
            id : 0,
            img : 'https://www.gizbot.com/img/2016/07/leeco-tv-image-30-1469870597.jpg',

        },
        {
            name : 'TV Box',
            parent : 1,
            id : 1,
            img : 'https://www.gizbot.com/img/2016/07/leeco-tv-image-30-1469870597.jpg',
        }
    ]
}

export const SubCatagoryReducer = (state = inti,actions={})=>{
    switch(actions.type){
        case 'ADD_SUBCATAGORY':
            return {
                ...state,
                subcatagories : [...state.subcatagories,actions.payload]
            }
        default :
            return state;
    }
}