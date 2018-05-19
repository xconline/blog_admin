import $ from 'jquery';

const initState = {
    selectedKey: 0,
}
const siderReducer = (state = initState, action) => {
    let newState = null;
    switch (action.type) {
        case 'CHANGE_SELECT':
            newState = Object.assign({}, state, {tags: action.tags});
            return newState;
        default:
            return state;
    }
}

export default siderReducer;