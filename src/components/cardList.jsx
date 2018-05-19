/**
 * 用来生成标签和分类的card
 */
import React, {Component} from 'react';
import {List, Icon, Card, Input} from 'antd';

let inputRefs = {};
class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVisibleArr: {}
        }
        
    }
    componentDidMount(){
        this.props.init();
        this.props.dataSource.map((t) => this.state.inputVisibleArr[t] = false);
        this.setState({
            inputVisibleArr: this.state.inputVisibleArr});
    }
    handleEdit = (item) => {
        this.state.inputVisibleArr[item] = true;
        this.setState({
            inputVisibleArr: this.state.inputVisibleArr
        }, () => inputRefs[item].focus());
    }
    handleEditConfirm(value, item){
        this.state.inputVisibleArr[item] = false;
        this.setState({inputVisibleArr: this.state.inputVisibleArr});
        this.props.handleEditConfirm(value, item)
    }
    render() {
        return (
            <div>
                <List
                    grid={{
                    gutter: 24,
                    column: 6
                }}
                    dataSource={this.props.dataSource}
                    renderItem={item => (
                    <List.Item >
                        <Card
                            actions={[ <Icon onClick = {
                                (e) => this.handleEdit(item)
                            }
                            type = "edit" />, <Icon onClick = {
                                () => this.props.handleDelete({item: item})
                            }
                            type = "delete" />
                        ]}
                            style={{
                            textAlign: 'center',
                            fontSize: 20
                        }}>{this.state.inputVisibleArr[item] ? <Input
                                ref={r => {
                                inputRefs[item] = r;
                            }}
                                onPressEnter={(e) => this.handleEditConfirm(e.target.value, item)}
                                onBlur={(e) => this.handleEditConfirm(e.target.value, item)}
                                size="small"/> : item}</Card>
                    </List.Item>
                )}/>
            </div>
        )
    }
}
export default CardList;