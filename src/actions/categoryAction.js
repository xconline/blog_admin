import $ from 'jquery';
import {
    get,
    post
} from '../api/fetchAPI';
import {
    server
} from '../config/serverAddress';

let actions = {
    // 初始化list，获取所有的文章信息
    initCategory: () => (dispatch, getState) => {
        get(`${server}/get_category/`).then(categroy => categroy['category']).then(r => dispatch(actions._initCategory(r)));
    },
    deleteCategory: (param) => (dispatch, getState) => {
        post(`${server}/delete_category/`, param).then(r => r['res']).then(r => dispatch(actions._deleteCategory(param.item, r)));
    },
    editCategory: (param) => (dispatch, getState) => {
        // Control.go('/editor'); // 跳转路径
        post(`${server}/edit_category/`, param).then(r => dispatch(actions._editCategory(param, r['res'])));
    },
    addCategory : (newCategory) =>(dispatch, getState)=>{
        post(`${server}/add_category/`, newCategory).then(res => res['res']).then(r => dispatch(actions._addCategory(newCategory['newCategory'], r)));
    },
    // 改变侧边栏选项
    // _changeSelect:(selectedKeys)=>({type:'CHANGE_SELECT',selectedKeys:selectedKeys}),
    _addCategory: (newCategory, res) => ({
        type: 'ADD_CATEGORY',
        newCategory: newCategory,
        res: res
    }),
    _deleteCategory: (oldCategory, res) => ({
        type: 'DELETE_CATEGORY',
        oldCategory: oldCategory,
        res: res
    }),
    _editCategory: (param, res) => ({
        type: 'EDIT_CATEGORY',
        param: param,
        res: res
    }),
    _initCategory: (category) => ({
        type: 'INIT_CATEGORY',
        category: category
    }),
}
export default actions;