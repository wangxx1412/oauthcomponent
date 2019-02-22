import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//HOC
export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    async shouldNavigateAway() {
      await this.props.fetchUser();
      // console.log('Token?', this.props.token);
      // console.log('Oauth?', this.props.oauth);
      if (!this.props.token && !this.props.oauth) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }

  }
  function mapStateToProps(state) {
    return { 
      token: state.auth.token,
      oauth: state.auth.oauth
    };
  }
  return connect(mapStateToProps, actions)(ComposedComponent);
};