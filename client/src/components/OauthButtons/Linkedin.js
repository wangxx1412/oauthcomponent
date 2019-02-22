import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Linkedin extends React.Component{
    render(){
        return(
            <a href={'/auth/linkedin'}>
            <Button color='linkedin'
            size='large'
                icon labelPosition='right'
                type={'linkedin'}
                width={'100%'}
                height={50} >
                Linkedin
                <Icon name='linkedin' />
            </Button>
            </a>
        );
    }
}

function mapStateToProps(state){
    return {errMsg: state.auth.errMsg};
}

export default connect(mapStateToProps, actions)(Linkedin);