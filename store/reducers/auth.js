import * as actionTypes from "../actions/actions";
import {utility} from "../utility";

const initial ={
  token:null,
  userId:null,
  error:null,
  loading:false,
  authRedirectPath:'/'
}

const authStart=(state,action)=>{
  return utility(state,{error:null,loading:true})
}

const authFail=(state,action)=>{
  return utility(state,{
    error:action.error,
    loading:false
  })
}

const authSuccess=(state,action)=>{
  return utility(state,{
    token:action.token,
    userId:action.userId,
    error:null,
    loading:false
  })
}

const authLogout=(state,action)=>{
  return {
    token:null,
    userId:null
  }
}

const setAuthRedirectPath=(state,action)=>{
  return utility(state,{authRedirectPath:action.path})
}

const reducers = (state=initial,action) =>{
  switch (action.type)
  {
    case actionTypes.AUTH_START : return authStart(state,action)
    case actionTypes.AUTH_SUCCESS :  return authSuccess(state,action)
    case actionTypes.AUTH_FAIL :  return authFail(state,action)
    case actionTypes.AUTH_LOGOUT : return  authLogout(state,action)
    case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action)
    default : return state
  }
}

export default reducers;
