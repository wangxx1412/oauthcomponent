import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Facebook extends React.Component{
    render(){
        return(
            <a href={'/auth/facebook'}>
            <Button color='facebook'
            size='large'
                icon labelPosition='right'
                type={'facebook'}
                width={'100%'}
                height={50} >
                Facebook
                <Icon name='facebook f' />
            </Button>
            </a>
        );
    }
}

function mapStateToProps(state){
    return {errMsg: state.auth.errMsg};
}

export default connect(mapStateToProps, actions)(Facebook);