import { AUTH_USER, AUTH_ERROR, FETCH_USER } from "../actions/types";

export default function (state = {}, action){
    switch(action.type){
        case AUTH_USER:
            return {...state, token:action.payload, errMsg:''};
        case FETCH_USER:
            return {...state, oauth: action.payload || false};
        case AUTH_ERROR:
            return {...state, errMsg: action.payload};
        default:
            return state;
    }
};