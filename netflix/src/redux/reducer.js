const initialState = {
    user : [],
    content:[],
    detail: []
}


function rootReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'GETUSER':
            
            return {
                ...state,
                user: action.payload
            }    
        case 'CONTENTUSER':
            return {
                ...state,
                content: action.payload.filter(data => data.email !== 'jsarabialugo@gmail.com')
            }
        case 'DETAILCARD':
            return  {
                ...state,
                detail: state.content.filter(data => data.id === action.payload)
            }
            case 'DELETEUSER': 
            return {
                ...state,
                content: state.content.filter(data => data.id !== action.payload)
            }
        default:
            break;
    }
}

export default rootReducer;