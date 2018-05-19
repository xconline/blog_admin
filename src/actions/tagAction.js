import $ from 'jquery';
import {
    get,
    post
} from '../api/fetchAPI';
import {
    server
} from '../config/serverAddress';
import {
    Control
} from 'react-keeper';
let actions = {
    // 初始化list，获取所有的文章信息
    initTag: () => (dispatch, getState) => {
        console.log('初始化tags')
        get(`${server}/get_tags/`).then(tags => tags['tags']).then(r => dispatch(actions._initTags(r)));
    },
    deleteTag: (param) => (dispatch, getState) => {
        post(`${server}/delete_tag/`, param).then(r => r['res']).then(r => dispatch(actions._deleteTag(param.tag, r)));
    },
    editTag: (param) => (dispatch, getState) => {
        // Control.go('/editor'); // 跳转路径
        post(`${server}/edit_tag/`, param).then(r => dispatch(actions._editTag(param, r['res'])));
    },
    addTag : (newTag) =>(dispatch, getState)=>{
        post(`${server}/add_tag/`, newTag).then(res => res['res']).then(r => dispatch(actions._addTag(newTag['newTag'], r)));
    },
    // 改变侧边栏选项
    // _changeSelect:(selectedKeys)=>({type:'CHANGE_SELECT',selectedKeys:selectedKeys}),
    _addTag: (newTag, res) => ({
        type: 'ADD_TAG',
        newTag: newTag,
        res: res
    }),
    _deleteTag: (oldTag, res) => ({
        type: 'DELETE_TAG',
        oldTag: oldTag,
        res: res
    }),
    _editTag: (param, res) => ({
        type: 'EDIT_TAG',
        param: param,
        res: res
    }),
    _initTags: (tags) => ({
        type: 'INIT_TAG',
        tags: tags
    }),
}
export default actions;