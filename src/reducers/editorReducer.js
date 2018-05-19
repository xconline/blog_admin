import $ from 'jquery';

const initState = {
    isPublishing: false,
    publishRes: false,
    tags: [],
    category: [],
    isModifing: false,
    modifyRes: false,
}
const editorReducer = (state = initState, action) => {
    let newState = null;
    switch (action.type) {
        
        case 'INIT_CATEGORY':
            newState = Object.assign({}, state, {category: action.category?action.category:[]});
            return newState;
        case 'BEGIN_PUBLISH':
            newState = Object.assign({}, state, {
                isPublishing: true,
            });
            return newState;
        case 'DONE_PUBLISH':
            newState = Object.assign({}, state, {
                isPublishing: false,
                publishRes: action.res
            });
            return newState;
        case 'BEGIN_MODIFY':
        console.log('开始修改')
            newState = Object.assign({}, state, {
                isModifing: true
            })
            return newState;
        case 'DONE_MODIFY':
        console.log('开始修改2')
            newState = Object.assign({},state,{
                isModifing: false,
                modifyRes: action.res,
            })
            return newState;
        default:
            return state;
    }
}

export default editorReducer;