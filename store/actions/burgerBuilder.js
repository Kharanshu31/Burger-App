import * as actionTypes from "./actions";
import axios from '../../axios-orders';

export const addIngredient=(name)=>{
  return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
  }
}

export const removeIngredient=(name)=>{
  return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
  }
}

export const setIngredients=(ingredients)=>{
  return {
    type:actionTypes.SET_INGREDIENT,
    ingredients:ingredients
  }
}

export const fetcherror=()=>{
  return {
    type:actionTypes.FETCH_ERROR
  }
}

export const initIngredients=()=>{
  return dispatch=>{
    axios.get( "https://react-my-burger-52295.firebaseio.com/ingredients.json" )
        .then( response => {
            dispatch(setIngredients(response.data))
        } )
        .catch( error => {
            dispatch(fetcherror())
        } );
  }
}
