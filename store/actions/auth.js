import * as actionTypes from "./actions";
import axios from "axios";

export const authStart =()=>{
  return {
    type:actionTypes.AUTH_START
  }
}

export const authSuccess =(token,userId)=>{
  return {
    type:actionTypes.AUTH_SUCCESS,
    token:token,
    userId:userId
  }
}

export const authFailure =(error)=>{
  return {
    type:actionTypes.AUTH_SUCCESS,
    error:error
  }
}

export const logout =()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
  localStorage.removeItem("userId");
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}

export const authTimeOut = samay =>{
  return dispatch =>{
    setTimeout(()=>{
        dispatch(logout())
    },samay*1000)
  }
}

export const auth = (email,password,method)=>{
  return (dispatch) =>{
    dispatch(authStart())
    const authData={
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWcJKvZDoimmg3jayr4N42xdQ3nUZq7vo";
    if(!method){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWcJKvZDoimmg3jayr4N42xdQ3nUZq7vo"
    }
    axios.post(url,authData)
    .then(response=>{
      console.log(response);
      const expireDate=new Date(new Date().getTime() + response.data.expiresIn *1000);
      localStorage.setItem("token",response.data.idToken);
      localStorage.setItem("expires",expireDate);
      localStorage.setItem("userId",response.data.localId);
      dispatch(authSuccess(response.data.idToken,response.data.localId))
      dispatch(authTimeOut(response.data.expiresIn))
    }).catch(err=>{
      console.log(err);
      dispatch(authFailure())
    })
  }
}

export const setAuthRedirectPath = (path) =>{
  return {
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path:path
  }
}

export const authCheckState=()=>{
  return dispatch =>{
    const token=localStorage.getItem("token");
    if(!token){
      dispatch(logout())
    }
    else {
      const expireDate=new Date(localStorage.getItem("expires"));
      const userId=localStorage.getItem("userId");
      if(expireDate<new Date()){
        dispatch(authSuccess(token,userId));
        dispatch(authTimeOut(expireDate.getSeconds()-new Date().getSeconds()));
      }
      else{
        dispatch(logout());
      }
    }
  }
}
