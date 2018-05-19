import {
    connect
} from 'react-redux';
import Tag from '../components/tag';
import actions from '../actions/tagAction';
import {
    bindActionCreators
} from 'redux';

const mapStateToProps = (state, ownProps) => ({
    // musicList: state.music.musicList,
    // currentMusicItem: state.music.currentMusicItem,
    // barColor: state.progress.barColor,
    // isPlay: state.music.isPlay,
    // playMode: state.music.playMode,
    tagList: state.tagReducer.tags,
    
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
)(Tag)