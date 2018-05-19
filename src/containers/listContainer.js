import {
    connect
} from 'react-redux';
import List from '../components/list';
import actions from '../actions/listAction';
import {
    bindActionCreators
} from 'redux';

const mapStateToProps = (state, ownProps) => ({
    // musicList: state.music.musicList,
    // currentMusicItem: state.music.currentMusicItem,
    // barColor: state.progress.barColor,
    // isPlay: state.music.isPlay,
    // playMode: state.music.playMode,
    articleList: state.listReducer.articleList,
    categoryFilter: state.listReducer.categoryFilter,
    deleteRes: state.listReducer.deleteRes,
    isdeleteFlag: state.listReducer.isdeleteFlag,
})


const mapDisPatchToProps = (dispatch, ownProps) => ({
    // playNext: callType => dispatch(playNext(callType)),
    // playPrev: () => dispatch(playPrev()),
    // playMusic: () => dispatch(playMusic()),
    // play: () => dispatch(play()),
    // changeMode: () => dispatch(changeMode()),
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDisPatchToProps
)(List)