import React from 'react';
import { connect } from 'react-redux';
import {Container, Header, Grid, Icon} from 'semantic-ui-react';
import * as actions from '../../actions';

class Signout extends React.Component{
    componentDidMount(){
        this.props.signout();
    }

    renderbye(){
        return(
            <Container>
                <Grid centered columns={2}>
                <Grid.Column>
                <Header as='h2' icon>
                    <Icon name='sign-out' />
                    Goodbye
                    <Header.Subheader>Not last time, seeya.</Header.Subheader>
                </Header>
                </Grid.Column>
                </Grid>
            </Container>
        );
    }

    render(){
        return(
            <div>
            {this.renderbye()};
            </div>
        );
    }
}

export default connect(null, actions)(Signout);