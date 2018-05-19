import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import listReducer from './listReducer';
import tagReducer from './tagReducer';
import categoryReducer from './categoryReducer';

// 另一种拆分方式
const initState = {
    article:{
        tags:[],
        category:[],
        articleList:[]
    },
    oper:{
        isPublishing:false,
        publishFlag:false,
        isDeleting:false,
        deleteFlag:false
    }
}
export default combineReducers({
    editorReducer,
    listReducer,
    tagReducer,
    categoryReducer,
})