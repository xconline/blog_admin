import $ from 'jquery';
const initState = {
    category:[]
}
const categoryReducer = (state = initState, action) => {
    let newState = null;
    switch (action.type) {
        case 'INIT_CATEGORY':
            newState = Object.assign({}, state, {category: action.category?action.category:[]});
            return newState;
        case 'ADD_CATEGORY':
            if (action.res) {
                newState = Object.assign({}, state, {
                    category: [
                        ...state.category,
                        action.newCategory
                    ]
                });
                return newState;
            } else {
                return state;
            }
        case 'EDIT_CATEGORY':
            if(action.res){
                newState = Object.assign({},state,{
                    category: state.category.map((t)=>{return t===action.param.oldCategory?action.param.newCategory:t})
                })
                return newState;
            }
            return state;
        case 'DELETE_CATEGORY':
            if(action.res){
                newState = Object.assign({},state,{
                    category: state.category.filter((t)=>{return t!=action.oldCategory})
                })
                return newState;
            }
            return state;
        default:
            return state;
    }
} 

export default categoryReducer;