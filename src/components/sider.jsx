import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import { CacheLink,Link } from 'react-keeper';
import '../style/sider.less';
import logo from '../static/images/logo.jpg';
const {SubMenu} = Menu;
const {Content, Sider} = Layout;

class AdminSider extends Component {
    constructor(props){
        super(props);
        this.state= {
            selectedKeys : ['1']
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        console.log(this.props)
        if(nextProps.selectedKeys!=undefined&&nextProps.selectedKeys.length!=0&&nextProps.selectedKeys!=this.props.selectedKeys){
            this.setState({
                selectedKeys: nextProps.selectedKeys,
            })
        }
    }
    handleClick = (e)=>{
        this.setState({
            selectedKeys: [e.key]
        })
    }
    render() {
        return (
            <Sider width={200} style={{
                background: '#fff'
            }}>
                <div className='logo'><img className='sider-logo' src={logo} alt=""/></div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1','sub2']}
                    // selectedKeys = {this.state.selectedKeys}
                    // onClick={({ item, key, keyPath })=>this.handleClick({ item, key, keyPath })}
                    style={{
                    height: '100%',
                    borderRight: 0,

                }}>
                    <SubMenu key="sub1" title={< span > <Icon type="user"/>文章</span>}>
                        <Menu.Item key="1"><Link to='/editor'>写文章</Link></Menu.Item>
                        <Menu.Item key="2"><CacheLink to='/list'>文章列表</CacheLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={< span > <Icon type="user"/>其它 </span>}>
                        <Menu.Item key="21"><Link to='/tags'>标签</Link></Menu.Item>
                        <Menu.Item key="22"><Link to='/category'>分类</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
export default AdminSider;