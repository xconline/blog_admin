import $ from 'jquery';
const initState = {
    tags:[]
}
const listReducer = (state = initState, action) => {
    let newState = null;
    switch (action.type) {
        case 'INIT_TAG':
            newState = Object.assign({}, state, {tags: action.tags?action.tags:[]});
            return newState;
        case 'ADD_TAG':
            if (action.res) {
                newState = Object.assign({}, state, {
                    tags: [
                        ...state.tags,
                        action.newTag
                    ]
                });
                return newState;
            } else {
                return state;
            }
        case 'EDIT_TAG':
            if(action.res){
                newState = Object.assign({},state,{
                    tags: state.tags.map((t)=>{return t===action.param.oldTag?action.param.newTag:t})
                })
                return newState;
            }
            return state;
        case 'DELETE_TAG':
            if(action.res){
                newState = Object.assign({},state,{
                    tags: state.tags.filter((t)=>{return t!=action.oldTag})
                })
                console.log(newState)
                return newState;
            }
            return state;
        default:
            return state;
    }
}

export default listReducer;