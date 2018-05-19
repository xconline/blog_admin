import React, {Component} from 'react';
import {List, Icon, Card, Input, Select} from 'antd';
import {Link} from 'react-keeper';
import CardList from './cardList';
const Option = Select.Option;
const InputGroup = Input.Group;
let inputRefs = {};
class Categories extends Component {
    constructor(props) {
        super(props);
    }
    handleEditConfirm = (newCategory, oldCategory) => {
        if (newCategory !== oldCategory) {
            this.props.actions.editCategory({newCategory: newCategory, oldCategory: oldCategory});
        }
    }
    render() {
        return (
            <div>
                <InputGroup style={{
                    paddingBottom: 20
                }} compact>
                    <Select defaultValue="新分类">
                        <Option value="新分类">新分类</Option>
                    </Select>
                    <Input
                        style={{
                        width: '20%'
                    }}
                        onPressEnter={(e) => {
                        if (this.props.categoryList.indexOf(e.target.value) < 0) 
                            this.props.actions.addCategory({newCategory: e.target.value})
                    }}
                        defaultValue="New Category"/>
                </InputGroup>
                <CardList
                    init={this.props.actions.initCategory}
                    dataSource={this.props.categoryList}
                    handleDelete={this.props.actions.deleteCategory}
                    handleEditConfirm={this.handleEditConfirm}></CardList>

            </div>
        )
    }
}
export default Categories;