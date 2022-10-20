const initState={
    value:''
}

const reducer=(state=initState,action)=>{
    const newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "VALUE": {
            newState.value=action.payload;
            break;
        }

        case '':{
            break;
        }
        default : return newState;
    }

    return newState
}

export default reducer;