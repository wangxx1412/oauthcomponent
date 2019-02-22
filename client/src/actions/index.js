import axios from 'axios';
import {AUTH_USER, AUTH_ERROR, FETCH_USER} from './types';

export const signup = (formProps, callback)=> async dispatch => { 
    try{
        const response = await axios.post('http://localhost:5000/signup',
         formProps
         );
        dispatch({type: AUTH_USER, payload:response.data.jwtoken});
        localStorage.setItem('jwtoken',response.data.jwtoken);
        callback();
    } catch(e){
        console.log(e);
        dispatch({type: AUTH_ERROR, payload:'Sorry, this Email has been used.'});
    }
};

export const signout = ()=> {
    axios.get('/api/logout');
    localStorage.removeItem('jwtoken');
    return {
        type: AUTH_USER,
        payload:''
    };
};

export const signin = (formProps, callback)=> async dispatch => { 
    try{
        const response = await axios.post('http://localhost:5000/signin',
         formProps
         );
        dispatch({type: AUTH_USER, payload:response.data.jwtoken});
        localStorage.setItem('jwtoken',response.data.jwtoken);
        callback();
    } catch(e){
        dispatch({type: AUTH_ERROR, payload:'Invalid login credentials.'});
    }
};

export const fetchUser = () => async dispatch => {
    const response = await axios.get("/api/current_user");
  
    dispatch({ type: FETCH_USER, payload: response.data });
  };
