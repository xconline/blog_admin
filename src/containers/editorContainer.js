import { connect } from 'react-redux'
import Editor from '../components/editor.jsx'
import actions from '../actions/editorAction'
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => ({
  // musicList: state.music.musicList,
  // currentMusicItem: state.music.currentMusicItem,
  // barColor: state.progress.barColor,
  // isPlay: state.music.isPlay,
  // playMode: state.music.playMode,
    isPublishing: state.editorReducer.isPublishing,
    publishRes: state.editorReducer.publishRes,
    isModifing: state.editorReducer.isModifing,
    modifyRes: state.editorReducer.modifyRes,
    tags: state.tagReducer.tags,
    category: state.editorReducer.category,
    editArticle: state.listReducer.editArticle,
	
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
)(Editor)