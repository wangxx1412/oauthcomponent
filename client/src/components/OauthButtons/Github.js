import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Github extends React.Component{
    render(){
        return(
            <a href={'/auth/github'}>
            <Button color='black'
            size='large'
                icon labelPosition='right'
                type={'github'}
                width={'100%'}
                height={50} >
                Github
                <Icon name='github' />
            </Button>
            </a>
        );
    }
}

function mapStateToProps(state){
    return {errMsg: state.auth.errMsg};
}

export default connect(mapStateToProps, actions)(Github);