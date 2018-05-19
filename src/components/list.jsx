import React, {Component} from 'react';
import {Table, Icon, Modal, Button, message} from 'antd';
import '../style/list.less';
import {Link} from 'react-keeper';

const data = [
    {
        key: '1',
        index: 1,
        title: 'xingce',
        desc: '<div class = \'descTr\'>descriptifasdff</div>',
        dateTime: '2017-1-8',
        category: '随笔'
    }
]
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            delete_article_id: 0
        };
        this.props.actions.initList();
    }
    handleDelete = () => {
        const param = {
            delete_article_id: this.state.delete_article_id
        };
        this.props.actions.deleteArticle(param);
        this.setState({confirmLoading: true})
    }
    handleCancelModal= ()=>{
        this.setState({visible:false})
    }
    handleEdit=(aId)=>{
        const param = {aId:aId};
        this.props.actions.editArticle(param);
    }
    componentWillReceiveProps(nextProps){
        // 如果nextProps和this.props的isdeleteFlag相反则是删除操作的返回
        if(nextProps.deleteRes&&!nextProps.isdeleteFlag==this.props.isdeleteFlag){ 
            this.setState({confirmLoading:false,visible:false});
        }else if(!nextProps.deleteRes&&!nextProps.isdeleteFlag==this.props.isdeleteFlag){
            this.setState({confirmLoading:false,});
            message.warn("删除失败",3);
        }
    }
    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'index',
                width: '4%'
            }, {
                title: '标题',
                dataIndex: 'title',
                // specify the condition of filtering result here is that finding the name started with `value`
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name.length - b.name.length,
                width: '35%'
            }, {
                title: '描述',
                dataIndex: 'desc',
                className: 'descTr'
            }, {
                title: '发布时间',
                dataIndex: 'date_publish',
                sorter: (a, b) => a.address.length - b.address.length,
                width: '15%'
            }, {
                title: '类别',
                dataIndex: 'category',
                defaultSortOrder: 'descend',
                filters: this.props.categoryFilter,
                onFilter: (value, record) => record.category.indexOf(value) === 0,
                width: '10%'
            }, {
                title: '操作',
                dataIndex: 'oper',
                width: '10%',
                render: (text, record, index) => {
                    // <Icon type="delete" />
                    return <div><Link to={`/list/${record.id}`}><Icon className='but' onClick={()=>this.handleEdit(record.id)} type="edit" /></Link><Icon className='but' style={{
                        marginLeft: 15
                    }} onClick={() => this.setState({delete_article_id: record.id, visible: true})} type="delete"/></div>
                }
            }
        ];
        const {visible, confirmLoading, ModalText, delete_article_id} = this.state;
        return (
            <div>
                <Table className='article_table' columns={columns} dataSource={this.props.articleList}/>
                <Modal
                    title="删除提示"
                    visible={visible}
                    onOk={this.handleDelete}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancelModal}>
                    <p>确定删除吗？</p>
                </Modal>
            </div>
        )
    }
}
export default List;