import React from 'react';
import {Container,Menu, Segment} from 'semantic-ui-react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';

class Header extends React.Component{
    renderLinks(){
        if(this.props.token){
            return (
                <Menu.Menu position='right'>
                <Menu.Item>
                <a href="/signout">Signout</a>
                </Menu.Item>  
                <Menu.Item>
                <a href="/landing">Landing</a>
                </Menu.Item>
                </Menu.Menu>
            );
        } else if(this.props.oauth){
            return(
                <Menu.Menu position='right'>
                <Menu.Item>
                <a href={"/api/logout"}>Signout</a>
                </Menu.Item>
                <Menu.Item>
                <a href="/landing">My Page</a>
                </Menu.Item>
                </Menu.Menu>
            );
        }
        else {
            return null;
        }
    }
    render(){
        return(
            <Segment inverted>
            <Menu inverted secondary>
                <Container>
                <Menu.Item header>
                <a 
                href={this.props.token || this.props.oauth ? '/landing' : '/'}>
                <h4>Home</h4>
                </a>
                </Menu.Item>
                {this.renderLinks()}
                </Container>
            </Menu>
            </Segment>
        );
    }
}

function mapStateToProps(state){
    return {
        token: state.auth.token,
        oauth: state.auth.oauth
    };
}
export default withRouter(connect(mapStateToProps, actions)(Header));