import React from 'react';
import {Container, Header, Grid, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';


class Landing extends React.Component{
    
    render(){
        return(
            <Container>
            <Grid centered columns={2}>
                <Grid.Column>
                <Header as='h2' icon>
                    <Icon name='thumbs up' />
                    Landing Page
                    <Header.Subheader>Quiet, User that not signed in can't visit here.</Header.Subheader>
                </Header>
                </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        oauth: state.auth.oauth
    };
}

export default connect(mapStateToProps)(Landing);