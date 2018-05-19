import $ from 'jquery';
const initState = {
    articleList: [],
    categoryFilter: [],
    deleteRes: false,
    isdeleteFlag: false, // 判断是否进行了删除操作
    editArticle: undefined,
    selectedKeys: [],
}
const listReducer = (state = initState, action) => {
    let newState = null;
    switch (action.type) {
        case 'INIT_LIST':
            newState = Object.assign({}, state, {
                articleList: action.articleList
            });
            return newState;
        case 'INIT_FILTER':
            const categoryFilter = action.categoryFilter?action.categoryFilter.map((c, index) => {
                return {
                    text: c,
                    value: c,
                }
            }):[];
            newState = Object.assign({}, state, {
                categoryFilter: categoryFilter
            })
            return newState;
        case 'DELETE_ARTICLE':
            newState = Object.assign({}, state, {
                articleList: action.res ? state.articleList.filter((a, index) => {
                    return a.id !== action.delete_article_id;
                }) : state.articleList,
                deleteRes: action.res,
                isdeleteFlag: !state.isdeleteFlag
            })
            return newState;
        case 'EDIT_ARTICLE':
            newState = Object.assign({}, state, {
                editArticle: action.article,
            })
            return newState;
        
        case 'INIT_CATEGORY':
            newState = Object.assign({}, state, {
                category: action.category
            });
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
        // 改变侧边栏选项
        // case 'CHANGE_SELECT':
        //     newState = Object.assign({}, state, {
        //         selectedKeys: action.selectedKeys,
        //     })
        //     return newState;
        default:
            return state;
    }
}

export default listReducer;