/**
 * Created by Administrator on 2018/4/13.
 */
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
    // 发布文章
    publishBlog: articleForm => (dispatch, getState) => {
        dispatch(actions.beginPublish())
        post(`${server}/publish_article/`, articleForm).then(r => r['res']).then(r => dispatch(actions.donePublish(r)));
    },
    modifyBlog: articleForm => (dispatch, getState) => {
        dispatch(actions.beginModify());
        post(`${server}/modify_article/`, articleForm).then(r => r['res']).then(r => {
            dispatch(actions.doneModify(r));
            Control.go(-1);
        });
    },
    // editor组件初始化
    editArticle: () => (dispatch, getState) => {
        get(`${server}/get_tags/`).then(tags => tags['tags']).then(r => dispatch(actions.initTag(r)));
        get(`${server}/get_category/`).then(categroy => categroy['category']).then(r => dispatch(actions.initCategory(r)));
    },
    addTag: (newTag) => (dispatch, getState) => {
        post(`${server}/add_tag/`, newTag).then(res => res['res']).then(r => dispatch(actions._addTag(newTag['newTag'], r)));
    },
    _addTag: (newTag, res) => ({
        type: 'ADD_TAG',
        newTag: newTag,
        res: res
    }),
    initTag: (tags) => ({
        type: 'INIT_TAG',
        tags: tags
    }),
    initCategory: (category) => ({
        type: 'INIT_CATEGORY',
        category: category
    }),
    beginPublish: () => ({
        type: 'BEGIN_PUBLISH'
    }),
    donePublish: (publishRes) => ({
        type: 'DONE_PUBLISH',
        res: publishRes
    }),
    beginModify: () => ({
        type: 'BEGIN_MODIFY'
    }),
    doneModify: (modifyRes) => ({
        type: 'DONE_MODIFY',
        res: modifyRes
    }),
}
export default actions;