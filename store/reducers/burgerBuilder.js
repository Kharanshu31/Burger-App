import * as actionTypes from '../actions/actions';
import {utility} from "../utility";

const initialState = {
    ingredients:null,
    totalPrice: 4,
    error:false,
    building:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    // bacon: 0.7
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
          const updatedIngredient={[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
          const updatedIngredients=utility(state.ingredients,updatedIngredient);
          const updatedState={
            ingredients:updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building:true
          }
          return utility(state,updatedState);


        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                building:true,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };


        case actionTypes.SET_INGREDIENT:
         return {
            ...state,
            ingredients:action.ingredients,
            totalPrice:4,
            error:false,
            building:false
         }

         case actionTypes.FETCH_ERROR:
         return {
            ...state,
            error:true
         }
        default:
            return state;
    }
};

export default reducer;
