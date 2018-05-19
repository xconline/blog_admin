/**
 * Created by Administrator on 2018/4/13.
 */
import $ from 'jquery';
import {get, post} from '../api/fetchAPI';
import {server} from '../config/serverAddress';
import {Control} from 'react-keeper';
let actions = {
    // 初始化list，获取所有的文章信息
    initList: () => (dispatch, getState) => {
        console.log('初始化list')
        get(`${server}/get_articleList/`).then(r => r['articleList']).then(r => dispatch(actions._initList(r)));
        get(`${server}/get_category/`).then(categroy => categroy['category']).then(r => dispatch(actions._initFilter(r)));
    },
    deleteArticle:(param) => (dispatch, getState) =>{
        post(`${server}/delete_article/`,param).then(r => r['res']).then(r => dispatch(actions._deleteArticle(param.delete_article_id,r)));
    },
    editArticle:(param)=>(dispatch, getState)=>{
        // Control.go('/editor'); // 跳转路径
        // dispatch(actions._changeSelect(['1']));
        get(`${server}/get_articleContent/`, param).then(r => dispatch(actions._editArticle(r)));
    },
    // 改变侧边栏选项
    // _changeSelect:(selectedKeys)=>({type:'CHANGE_SELECT',selectedKeys:selectedKeys}),
    _editArticle:(article)=>({type:'EDIT_ARTICLE',article:article}),
    _deleteArticle:(delete_article_id,res)=>({type:'DELETE_ARTICLE',delete_article_id:delete_article_id,res: res}),
    _addTag: (newTag, res) => ({type: 'ADD_TAG', newTag: newTag, res: res}),
    _initList: (articleList) => ({type: 'INIT_LIST',articleList: articleList}),
    _initFilter: (categoryFilter)=>({type:'INIT_FILTER',categoryFilter:categoryFilter}),
}
export default actions;
