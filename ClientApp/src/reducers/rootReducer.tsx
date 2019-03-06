const initState = {
    userId : "",
    
    posts:[
        {id: '1', title:'abc', body:'123'},
        {id: '2', title:'def', body:'456'},
        {id: '3', title:'ghi', body:'789'}
    ]
}
const rootReducer = (state=initState, action:any) =>{
    console.log(action.userId);
    if (action.type ==='SET_USER_ID') {
        return {
            ...state,
            userId : action.userId
        }
    }
    
    return state;
}

export default rootReducer