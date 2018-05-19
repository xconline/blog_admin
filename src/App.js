import React, {Component} from 'react';
import logo from './logo.svg';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Main from './components/main';
import './App.less';
import AdminSider  from './containers/siderContainer';


const { SubMenu } = Menu;
const {Content} = Layout;
class App extends Component {
    render() {
        return (
            <div className='adminLayout'>
                <Layout style={{height:'100vh'}}>
                    <AdminSider style={{height:'100vh'}}></AdminSider>
                    <Content className='content' >
                        <Main style={{background: '#fff'}}></Main>
                    </Content>
                </Layout>
            </div>
        )
    }
}
export default App;