import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Google extends React.Component{
    render(){
        return(
            <a href={'/auth/google'}>
            <Button color='google plus'
            size='large'
                icon labelPosition='right'
                type={'google'}
                width={'100%'}
                height={50} >
                Google
                <Icon name='google' />
            </Button>
            </a>
        );
    }
}

function mapStateToProps(state){
    return {errMsg: state.auth.errMsg};
}

export default connect(mapStateToProps, actions)(Google);