import React, {Component} from 'react';
import {Route} from 'react-keeper';
import Editor from '../containers/editorContainer';
import List from '../containers/listContainer';
import Tag from '../containers/tagContainer';
import Categories from '../containers/categoryContainer';
class Main extends Component {
    render() {
        return (
            <div>
                <Route cache index miss path='/editor>' component={Editor}></Route>
                <Route cache path='/list>' component={List}>
                </Route>
                <Route path='/list/:aId>' isModify={true} component={Editor}/>
                <Route path='/tags>'  component={Tag}/>
                <Route path='/category>'  component={Categories}/>
                
            </div>
        )
    }
}
export default Main;