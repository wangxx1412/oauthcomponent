import React from 'react';
import {
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Label,
    Segment,
    Tab
} from 'semantic-ui-react';
import Google from './OauthButtons/Google';
import Facebook from './OauthButtons/Facebook';
import Linkedin from './OauthButtons/Linkedin';
import Github from './OauthButtons/Github';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const panes = [
    { menuItem: 'Sign Up', render: () => <Tab.Pane><Signup /></Tab.Pane> },
    { menuItem: 'Sign In', render: () => <Tab.Pane><Signin /></Tab.Pane> },
  ]

class Welcome extends React.Component{
    render(){
        return(
            <Container>
                <Header as='h2'>
                Try Diffrent Login Methods Here!
                </Header>
                <Label as='a' color='white'>
                <Icon name='code'/>
                <a href='https://github.com/wangxx1412/oauthcomponent'>
                Source Code
                </a>
                </Label>
                <Divider />
                <Grid stackable columns={2}>
                    <Grid.Column>
                    <Segment raised>
                    <Header as='h3'>
                    With Social
                    </Header>
                    <Divider />
                    <Grid columns='equal' className="buttons">
                    <Grid.Row>
                        <Grid.Column>
                        <Google />   
                        </Grid.Column>
                        <Grid.Column>
                        <Facebook />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Linkedin />
                        </Grid.Column>
                        <Grid.Column>
                        <Github />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    </Segment>
                    </Grid.Column> 
                    
                    <Grid.Column>
                    <Segment raised>
                    <Header as='h3'>With Email</Header>
                    <Divider />
                    <Tab menu={{ secondary: true, pointing: true}} panes={panes} />
                    </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default Welcome;