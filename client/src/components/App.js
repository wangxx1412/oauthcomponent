import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter} from 'react-router-dom';

class App extends React.Component {
    render(){
        return(
            <div>
                <Header />   
                {this.props.children}  
            </div>
        );
    }
};

export default withRouter(connect(null, actions)(App));