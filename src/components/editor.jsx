import React, {Component} from 'react';
import {Input, Button, message} from 'antd';
import BraftEditor from 'braft-editor';
import {Route} from 'react-keeper';
import 'braft-editor/dist/braft.css';
import {Tag} from 'antd';
import {Row, Col, Icon} from 'antd';
import {Radio} from 'antd';
import '../style/editor.less';
import List from './list';
import {Link} from 'react-keeper';
import {Control} from 'react-keeper';
import {post} from '../api/fetchAPI';
import {server} from '../config/serverAddress';
import $ from 'jquery';
const RadioGroup = Radio.Group;

const {TextArea} = Input;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];
const kindServer = ['文章', 'debug记录', '随笔'];
let tipMessage = null;
const initState = {
    selectedTag: [],
    selectedKind: '',
    newTagInput: false,
    newTagInputValue: '',
    title: '',
    desc: ''
}
class Editor extends Component {
    constructor(props) {
        super(props);
        this.newTagInputRef = null;
        this.editorInstance = null;
        this.state = initState;
    }
    componentDidMount = () => {
        this.props.actions.editArticle(); // 获得tags和category动作
    }
    tagChange = (checked, tag) => {
        const newSelectedTag = checked ? [
            ...this.state.selectedTag,
            tag
        ] : this.state.selectedTag.filter((t) => t != tag);
        this.setState({selectedTag: newSelectedTag})
    }
    // 文章分类改动
    kindChange = (e) => {
        this.setState({selectedKind: e.target.value})
    }
    // 新标签添加点击
    newTagClick = () => {
        this.setState({
            newTagInput: true
        }, () => this.newTagInputRef.focus())
    }
    // 添加新标签函数
    newTagInputChange = (e) => {
        console.log(this.props)
        const {value} = e.target;
        if (this._isEmpty(value)) {
            message.warn('不能添加空标签', 3);
            return;
        }
        if (this.props.tags.indexOf(value) < 0) {
            const newTag = {
                newTag: value
            }
            this.props.actions.addTag(newTag);
        } else {
            message.warn('已有此标签', 2000);
        }
        this.setState({newTagInput: false});
    }
    // 判断是否为空
    _isEmpty = (value) => {
        return value === undefined || value === null || value === '';
    }
    _checkArticle = () => {
        if (this._isEmpty(this.state.title)) {
            message.warn("必须填写标题", 3);
            return false;
        }
        if (this._isEmpty(this.state.desc)) {
            message.warn("必须填写描述", 3);
            return false;
        }
        if (this._isEmpty(this.state.selectedKind)) {
            message.warn("必须选择分类", 3);
            return false;
        }
        if (this._isEmpty(this.editorInstance.getContent('html'))) {
            message.warn("必须填写内容", 3);
            return false;
        }
        return true;
    }
    // 发布文章,构建表单，字段名和数据库保持一致
    clickPublish = (isDraft = false) => {
        const articleForm = {};
        if (this._checkArticle()) {
            articleForm['title'] = this.state.title;
            articleForm['desc'] = this.state.desc;
            articleForm['tags'] = this.state.selectedTag;
            articleForm['category'] = this.state.selectedKind;
            articleForm['content'] = this.editorInstance.getContent('html');
            articleForm['isDraft'] = isDraft;
            this.props.actions.publishBlog(articleForm);
        }
    }
    // 保存修改文章
    clickModify = () => {
        const articleForm = {};
        if (this._checkArticle()) {
            articleForm['id'] = this.props.params.aId,
            articleForm['title'] = this.state.title;
            articleForm['desc'] = this.state.desc;
            articleForm['tags'] = this.state.selectedTag;
            articleForm['category'] = this.state.selectedKind;
            articleForm['content'] = this.editorInstance.getContent('html');
            this.props.actions.modifyBlog(articleForm);
        }
    }
    handleEditArticle = (article) => {
        this.setState({title: article.title, desc: article.desc, selectedTag: article.tags, selectedKind: article.category})
        this.editorInstance.setContent(article.content, 'html');
    }
    _publishOrModifyTip(flag, res) {
        // 提交提示
        if (flag) {
            tipMessage = message.loading('文章提交中', 0, () => tipMessage = null);
        } else if (!flag && res === true && tipMessage != null) {
            setTimeout(tipMessage, 0);
            tipMessage = null;
            this.setState({
                ...initState,
                selectedKind: this.state.selectedKind
            }); // 初始化editor组件
            this.editorInstance.setContent("", 'html');
        } else if (!flag && res === false && tipMessage != null) {
            setTimeout(tipMessage, 0);
            tipMessage = message.warn('文章提交失败', 3, () => tipMessage = null);
        }
    }
    componentWillReceiveProps(nextProps) {
        // 提交提示
        if (!nextProps.isMofify) {
            this._publishOrModifyTip(nextProps.isPublishing, nextProps.publishRes);
        }
        // 修改提示
        if (nextProps.isModify) {
            this._publishOrModifyTip(nextProps.isModifing, nextProps.modifyRes);
        }

        // 设置默认文章分类
        if (nextProps.category !== undefined && nextProps.category.length != 0 && this.state.selectedKind === '') {
            this.setState({selectedKind: nextProps.category[0]})
        }
        // 判断是否传入了要编辑的文章,根据isModify
        if (nextProps.editArticle && nextProps.isModify) {
            this.handleEditArticle(nextProps.editArticle)
        }
    }
    uploadFn = (param) => {
        // fetch(`${server}/upload/`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     body: form,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data;charset=utf-8'
        //     }
        // }).then(r => {
        //     console.log(r)
        // })
        const serverURL = `${server}/upload/`
        const xhr = new XMLHttpRequest
        const fd = new FormData()

        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
        console.log(param.libraryId)

        const successFn = (response) => {
            console.log(xhr.response)
            // 假设服务端直接返回文件上传后的地址 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: xhr.responseText,
                meta: {
                    id: param.libraryId,
                    title: 'sfda',
                    alt: 'afs',
                    loop: false, // 指定音视频是否循环播放
                    autoPlay: false, // 指定音视频是否自动播放
                    controls: false, // 指定音视频是否显示控制栏
                    poster: '', // 指定视频播放器的封面
                }
            })
        }

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({msg: 'unable to upload.'})
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
        // post(`${server}/upload/`,{file:param.file}).then((r)=>{     console.log(r)     param.success({         url: r.url,
        //      meta:{             id: param.libraryId,         }     }) })
    }
    render() {
        const editorProps = {
            height: 500,
            contentFormat: 'raw',
            initialContent: '<p>Hello World!</p>',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            media: {
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: true, // 开启图片插入功能
                video: false, // 开启视频插入功能
                audio: false, // 开启音频插入功能
                validateFn: null, // 指定本地校验函数，说明见下文
                uploadFn: this.uploadFn, // 指定上传函数，说明见下文
                removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
                onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
                onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
                onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
            }
        }
        return (
            <div>
                <Input
                    onChange={(e) => this.setState({title: e.target.value})}
                    value={this.state.title}
                    className='select_row'
                    placeholder='标题'/>
                <TextArea
                    onChange={(e) => this.setState({desc: e.target.value})}
                    value={this.state.desc}
                    className='select_row'
                    placeholder='文章描述'
                    autosize={{
                    minRows: 2,
                    maxRows: 6
                }}/>
                <BraftEditor ref={instance => this.editorInstance = instance} {...editorProps}/>
                <Row className='select_row'>
                    <Col span={2}>
                        <h4
                            style={{
                            marginRight: 8,
                            display: 'inline'
                        }}>文章标签:</h4>
                    </Col>
                    <Col span={22}>
                        {this.props.tags.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={this.state.selectedTag.indexOf(tag) > -1}
                                onChange={checked => this.tagChange(checked, tag)}>
                                {tag}
                            </CheckableTag>
                        ))}
                        {this.state.newTagInput ? <Input
                            ref={input => this.newTagInputRef = input}
                            type="text"
                            size="small"
                            style={{
                            width: 78
                        }}
                            onBlur={this.newTagInputChange}
                            onPressEnter={this.newTagInputChange}></Input> : <Tag
                            onClick={this.newTagClick}
                            style={{
                            background: '#fff',
                            borderStyle: 'dashed'
                        }}>
                            <Icon type="plus"/>
                            New Tag
                        </Tag>}
                    </Col>
                </Row>
                <Row className='select_row'>
                    <Col span={2}>
                        <h4
                            style={{
                            marginRight: 8,
                            display: 'inline'
                        }}>文章分类:</h4>
                    </Col>
                    <Col span={22}>
                        <RadioGroup onChange={this.kindChange} value={this.state.selectedKind}>
                            {this.props.category.map((category, index) => {
                                return <Radio key={index} value={category}>
                                    {category}
                                </Radio>
                            })}
                        </RadioGroup>
                    </Col>
                </Row>
                {this.props.isModify ? <Row className='select_row' type="flex" justify="space-around" align="middle">
                    <Col offset={5} span={2}>
                        <Button onClick={() => Control.go(-1)}>取消修改</Button>
                    </Col>
                    <Col pull={6} span={2}>
                        <Button onClick={() => this.clickModify()}>保存修改</Button>
                    </Col>
                </Row> : <Row className='select_row' type="flex" justify="space-around" align="middle">
                    <Col offset={5} span={2}>
                        <Button onClick={() => this.clickPublish(true)}>保存为草稿</Button>
                    </Col>
                    <Col pull={6} span={2}>
                        <Button onClick={() => this.clickPublish(false)}>发布文章</Button>
                    </Col>
                </Row>}
            </div>
        )
    }
}
export default Editor;