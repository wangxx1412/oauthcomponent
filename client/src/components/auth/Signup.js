import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Button, Form} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions'

class Signup extends React.Component{
    //onsubmit instance property receives arrow function
   onSubmit = (formProps)=>{
        this.props.signup(formProps, ()=>{
            this.props.history.push('/landing');
        });
    };

    render(){
        const { handleSubmit } = this.props;
        return(
            
            <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Form.Field>
                    <label>Email</label>
                    <Field
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                    />
            </Form.Field>
            <Form.Field>
                    <label>Password</label>
                    <Field
                    name="password"
                    type="password"
                    component="input"
                    autoComplete="none"
                    />
            </Form.Field>
                {this.props.errMsg ? 
                <div>{this.props.errMsg}</div> 
                : null }
                <Button primary>Sign Up</Button>
            </Form>
           
        );
    }
}
function mapStateToProps(state){
    return {errMsg: state.auth.errMsg};
}
export default withRouter(compose(
    connect(mapStateToProps, actions),
    reduxForm({form:'signup'})
)(Signup));

