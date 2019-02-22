import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Welcome from './components/Welcome';
import Landing from './components/Landing';
import Signout from './components/auth/Signout';
import requireAuth from './components/requireAuth';

const store = createStore(
    reducers,
    {
        auth:{ token:localStorage.getItem('jwtoken')}
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App>
            <Switch>
            <Route exact path="/"  component={Welcome} />
            <Route exact path='/landing' component={requireAuth(Landing)} />
            <Route exact path='/signout' component={Signout} />
            </Switch>
        </App>
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById ('root')
)