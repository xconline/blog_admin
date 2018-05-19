import React, {Component} from 'react';
import {List, Icon, Card, Input, Select} from 'antd';
import '../style/list.less';
import {Link} from 'react-keeper';
import CardList from './cardList';
const Option = Select.Option;
const InputGroup = Input.Group;
let inputRefs = {};
class Tag extends Component {
    constructor(props) {
        super(props);
    }
    handleEditConfirm = (newTag, oldTag) => {

        if (newTag !== oldTag) {
            this.props.actions.editTag({newTag: newTag, oldTag: oldTag});
        }
    }
    render() {
        return (
            <div>
                <InputGroup style={{
                    paddingBottom: 20
                }} compact>
                    <Select defaultValue="新标签">
                        <Option value="新标签">新标签</Option>
                    </Select>
                    <Input
                        style={{
                        width: '20%'
                    }}
                        onPressEnter={(e) => {
                        if (this.props.tagList.indexOf(e.target.value) < 0) 
                            this.props.actions.addTag({newTag: e.target.value});
                    }}
                        defaultValue="New Tag"/>
                </InputGroup>
                <CardList
                    init={this.props.actions.initTag}
                    dataSource={this.props.tagList}
                    handleDelete={this.props.actions.deleteTag}
                    handleEditConfirm={this.handleEditConfirm}></CardList>

            </div>
        )
    }
}
export default Tag;